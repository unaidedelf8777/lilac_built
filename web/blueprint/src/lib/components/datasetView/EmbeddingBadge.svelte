<script lang="ts">
  import {Tag} from 'carbon-components-svelte';
  import {AssemblyCluster} from 'carbon-icons-svelte';
  import {hoverTooltip} from '../common/HoverTooltip';

  export let embedding: string | undefined;
  export let hideEmbeddingName = false;
</script>

<div
  class="embedding-badge truncate"
  class:embedding-badge-nolabel={hideEmbeddingName}
  use:hoverTooltip={{text: 'Embedding index'}}
>
  <Tag {...$$restProps} type="purple" icon={AssemblyCluster}>
    {!hideEmbeddingName ? embedding : ''}
  </Tag>
</div>

<style lang="postcss">
  :global(.embedding-badge-nolabel .bx--tooltip__label .bx--tooltip__trigger) {
    @apply m-0;
  }
  :global(.embedding-badge-nolabel .bx--tag__custom-icon) {
    @apply mr-0;
  }
</style>
