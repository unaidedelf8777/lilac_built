<script lang="ts">
  import {goto} from '$app/navigation';
  import Commands, {Command, triggerCommand} from '$lib/components/commands/Commands.svelte';
  import ConceptView from '$lib/components/concepts/ConceptView.svelte';
  import {queryConcept, queryConcepts} from '$lib/queries/conceptQueries';
  import {urlHash} from '$lib/stores/urlHashStore';
  import {conceptLink} from '$lib/utils';
  import {SkeletonText} from 'carbon-components-svelte';
  import AddAlt from 'carbon-icons-svelte/lib/AddAlt.svelte';

  let namespace: string | undefined;
  let conceptName: string | undefined;

  $: $urlHash.onHashChange('/(?<namespace>.+)/(?<conceptName>.+)', ctx => {
    namespace = ctx.namespace;
    conceptName = ctx.conceptName;
  });

  const concepts = queryConcepts();

  $: concept = namespace && conceptName ? queryConcept(namespace, conceptName) : undefined;
</script>

<div class="flex h-full w-full">
  <div class="flex h-full w-72 flex-col border-r border-gray-200">
    {#if $concepts.isLoading}
      <SkeletonText />
    {:else if $concepts.isSuccess}
      {#each $concepts.data as c}
        <a
          href={conceptLink(c.namespace, c.name)}
          class="flex w-full flex-row items-center whitespace-pre border-b border-gray-200 px-4 py-2 hover:bg-gray-100"
          class:bg-blue-100={c.name === conceptName}
          class:hover:bg-blue-100={c.name === conceptName}
        >
          <span class="opacity-50">{c.namespace} / </span><span> {c.name}</span>
        </a>
      {/each}

      <button
        on:click={() =>
          triggerCommand({
            command: Command.CreateConcept,
            onCreate: e => goto(conceptLink(e.detail.namespace, e.detail.name))
          })}
        class="mt-4 flex w-full items-center gap-x-1 px-4 py-2 text-left text-sm text-gray-500 hover:text-blue-500"
        ><AddAlt /> Add Concept</button
      >
    {/if}
  </div>
  <div class="h-full w-full p-4">
    {#if $concept?.isLoading}
      <SkeletonText />
    {:else if $concept?.isError}
      <p>{$concept.error.message}</p>
    {:else if $concept?.isSuccess}
      <ConceptView concept={$concept.data} />
    {/if}
  </div>
</div>

<Commands />