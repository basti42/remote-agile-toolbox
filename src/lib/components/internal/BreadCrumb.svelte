<script lang="ts">
	import * as BreadCrumb from '$lib/components/ui/breadcrumb';
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte';

	const urlPathStore = getUrlPathStore();
</script>

<BreadCrumb.Root>
	<BreadCrumb.List>
		{#each urlPathStore.paths as path, i}
			{#if i > 0}
				<!-- don't show a separator in front of the first element -->
				<BreadCrumb.Separator />
			{/if}
			<BreadCrumb.Item>
				<BreadCrumb.Link href={path.href}>{path.section}</BreadCrumb.Link>
			</BreadCrumb.Item>
		{/each}
	</BreadCrumb.List>
</BreadCrumb.Root>
