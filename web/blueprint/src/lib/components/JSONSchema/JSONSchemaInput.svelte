<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import {NumberInput, Select, SelectItem, TextInput, Toggle} from 'carbon-components-svelte';
  import type {Draft, JSONError} from 'json-schema-library';
  import type {SvelteComponent} from 'svelte';
  import SvelteMarkdown from 'svelte-markdown';
  import JsonSchemaArrayInput from './JSONSchemaArrayInput.svelte';

  /** The json schema to use */
  export let schema: Draft;
  /** The path to the property in the schema */
  export let path = '';
  /** Whether the property is required */
  export let required = false;
  /** The value of the property */
  export let value: any;
  /** The root value of the schema */
  export let rootValue: any;
  /** List of property keys that are hidden */
  export let hiddenProperties: string[] = [];
  /** Whether to show the description */
  export let showDescription = true;
  /** List of validation errors */
  export let validationErrors: JSONError[] = [];
  /** Custom components to use for certain properties */
  export let customComponents: Record<string, typeof SvelteComponent>;

  $: property = schema.getSchema(path, value);
  $: label = property.title ? `${property.title} ${required ? '*' : ''}` : '';

  // FInd the validation error for this property using some pointer magic
  $: validation = validationErrors.filter(
    err =>
      `${err?.data?.pointer}${err?.data?.key ? '/' + err?.data?.key : ''}`.replaceAll('#', '') ==
      path
  );

  // Map common validation errors to user friendly messages
  let validationText = '';
  $: {
    if (validation.length == 0) validationText = '';
    else if (validation[0].code === 'min-length-one-error') {
      validationText = 'Value is required';
    } else if (validation[0].code === 'required-property-error') {
      validationText = 'Value is required';
    } else {
      validationText = validation[0].message;
    }
  }

  // Replace empty strings with undefined
  $: {
    if (value === '') value = undefined;
  }
</script>

{#if !hiddenProperties?.includes(path)}
  {#if customComponents[path]}
    <svelte:component
      this={customComponents[path]}
      bind:value
      {rootValue}
      invalid={!!validation.length}
      invalidText={validationText}
    />
  {:else if property.type == 'error'}
    <!-- Error -->
    <div class="text-red-600">{property.message}</div>
  {:else if property.enum}
    <Select bind:selected={value} name={path} helperText={property.description} labelText={label}>
      {#if !required}
        <SelectItem value={undefined} text={'None'} />
      {/if}
      {#each property.enum as item}
        <SelectItem value={item} />
      {/each}
    </Select>
  {:else if property.type == 'string'}
    <!-- Text Input -->
    <TextInput
      bind:value
      name={path}
      helperText={property.description}
      labelText={label}
      invalid={!!validation.length}
      invalidText={validationText}
      placeholder={!required ? '(optional)' : ''}
    />
  {:else if property.type == 'number'}
    <!-- Number Input -->
    <NumberInput
      bind:value
      name={path}
      helperText={property.description}
      {label}
      invalid={!value && required}
    />
  {:else if property.type == 'boolean'}
    <!-- Boolean Input -->
    <div>
      <Toggle labelText={label} bind:toggled={value} />
      <span class="bx--form__helper-text">{property.description}</span>
    </div>
  {:else if property.type == 'array'}
    <!-- List of inputs -->
    <JsonSchemaArrayInput
      {path}
      bind:value
      {schema}
      {validationErrors}
      {customComponents}
      {rootValue}
    />
  {:else if property.type == 'object'}
    <!-- Object -->
    {#if property.description && showDescription}
      <div class="description mb-4">
        <SvelteMarkdown source={property.description} />
      </div>
    {/if}
    {#each Object.keys(property.properties ?? {}) as key}
      <svelte:self
        bind:value={value[key]}
        path={path + '/' + key}
        {schema}
        {hiddenProperties}
        {validationErrors}
        {customComponents}
        {rootValue}
        required={property.required?.includes(key)}
      />
    {/each}
  {:else}
    Unknown property: {JSON.stringify(property)}
  {/if}
{/if}

<style lang="postcss">
  :global(.description p) {
    @apply text-sm;
  }
</style>