<script context="module" lang="ts">
  const COMMAND_SIGNAL_CONTEXT = 'COMMAND_SIGNAL_CONTEXT';

  interface CommandSignalStore {
    path: Path | undefined;
    jsonSchema: JSONSchema7 | undefined;
  }

  export function getCommandSignalContext() {
    return getContext<Readable<CommandSignalStore>>(COMMAND_SIGNAL_CONTEXT);
  }

  function createCommandSignalContext(path?: Path, jsonSchema?: JSONSchema7) {
    const store = writable<CommandSignalStore>({path, jsonSchema});
    setContext(COMMAND_SIGNAL_CONTEXT, store);
    return store;
  }
</script>

<script lang="ts">
  import {computeSignalColumnMutation} from '$lib/queries/datasetQueries';
  import {getDatasetViewContext} from '$lib/stores/datasetViewStore';
  import {
    SIGNAL_INPUT_TYPE_TO_VALID_DTYPES,
    type LilacSchemaField,
    type Path,
    type Signal,
    type SignalInfoWithTypedSchema
  } from '$lilac';
  import {ComposedModal, ModalBody, ModalFooter, ModalHeader} from 'carbon-components-svelte';
  import type {JSONSchema4Type, JSONSchema7} from 'json-schema';
  import type {JSONError} from 'json-schema-library';
  import {SvelteComponent, createEventDispatcher, getContext, setContext} from 'svelte';
  import SvelteMarkdown from 'svelte-markdown';
  import {writable, type Readable} from 'svelte/store';
  import JsonSchemaForm from '../JSONSchema/JSONSchemaForm.svelte';
  import {
    Command,
    type ComputeSignalCommand,
    type EditPreviewConceptCommand,
    type PreviewConceptCommand
  } from './Commands.svelte';
  import EmptyComponent from './customComponents/EmptyComponent.svelte';
  import SelectConcept from './customComponents/SelectConcept.svelte';
  import SelectEmbedding from './customComponents/SelectEmbedding.svelte';
  import FieldSelect from './selectors/FieldSelect.svelte';
  import SignalList from './selectors/SignalList.svelte';

  export let command: ComputeSignalCommand | PreviewConceptCommand | EditPreviewConceptCommand;

  let path = command.path;
  let signalInfo: SignalInfoWithTypedSchema | undefined;
  let signalPropertyValues: Record<string, Record<string, JSONSchema4Type>> = {};
  let errors: JSONError[] = [];

  // Set the signal values if we are editing a signal
  if (command.command === Command.EditPreviewConcept && command.signalName) {
    signalPropertyValues = {[command.signalName]: {...command.value}};
  }

  // Store the field path and json schema in the context so custom components can access it
  const contextStore = createCommandSignalContext(path, signalInfo?.json_schema);
  $: $contextStore.path = path;
  $: $contextStore.jsonSchema = signalInfo?.json_schema;

  const datasetViewStore = getDatasetViewContext();
  const dispatch = createEventDispatcher();

  const computeSignalMutation = computeSignalColumnMutation();

  const customComponents: Record<string, Record<string, typeof SvelteComponent>> = {
    concept_score: {
      '/namespace': EmptyComponent,
      '/concept_name': SelectConcept,
      '/embedding': SelectEmbedding
    }
  };

  $: {
    if (signalInfo?.name) setSignalName(signalInfo.name);
  }

  $: signal = signalInfo?.name ? (signalPropertyValues[signalInfo.name] as Signal) : undefined;

  $: filterField = (field: LilacSchemaField) => {
    if (!field.dtype) return false;
    if (!signalInfo?.input_type) {
      return true;
    }
    const validDtypes = SIGNAL_INPUT_TYPE_TO_VALID_DTYPES[signalInfo.input_type];
    return validDtypes.includes(field.dtype);
  };

  function setSignalName(name: string) {
    if (!(name in signalPropertyValues)) {
      signalPropertyValues[name] = {};
    }
    signalPropertyValues[name].signal_name = name;
  }

  function submit() {
    if (!signal) return;
    if (command.command === Command.ComputeSignal) {
      $computeSignalMutation.mutate([
        command.namespace,
        command.datasetName,
        {
          leaf_path: path || [],
          signal
        }
      ]);
    } else if (command.command === Command.PreviewConcept) {
      if (path) {
        datasetViewStore.addUdfColumn({
          path: path,
          signal_udf: signal
        });
      }
    } else if (command.command === Command.EditPreviewConcept) {
      if (path) {
        datasetViewStore.editUdfColumn(command.alias, {
          path: path,
          signal_udf: signal,
          alias: command.alias
        });
      }
    }
    close();
  }

  function close() {
    dispatch('close');
  }
</script>

<ComposedModal open on:submit={submit} on:close={close}>
  <ModalHeader
    label="Signals"
    title={command.command === Command.ComputeSignal ? 'Compute Signal' : 'Preview Signal'}
  />
  <ModalBody hasForm>
    <div class="flex flex-row">
      <div class="-ml-4 mr-4 w-80 grow-0">
        <SignalList defaultSignal={command.signalName} bind:signal={signalInfo} />
      </div>

      <div class="flex w-full flex-col gap-y-6">
        {#if signalInfo}
          {#key signalInfo}
            <div>
              <SvelteMarkdown source={signalInfo.json_schema.description} />
            </div>

            <FieldSelect
              filter={filterField}
              defaultPath={command.path}
              bind:path
              labelText="Field"
            />

            <JsonSchemaForm
              schema={signalInfo.json_schema}
              bind:value={signalPropertyValues[signalInfo?.name]}
              bind:validationErrors={errors}
              showDescription={false}
              hiddenProperties={['/signal_name']}
              customComponents={customComponents[signalInfo?.name]}
            />
          {/key}
        {:else}
          No signal selected
        {/if}
      </div>
    </div>
  </ModalBody>
  <ModalFooter
    primaryButtonText={command.command === Command.ComputeSignal ? 'Compute' : 'Preview'}
    secondaryButtonText="Cancel"
    primaryButtonDisabled={errors.length > 0 || !path}
    on:click:button--secondary={close}
  />
</ComposedModal>