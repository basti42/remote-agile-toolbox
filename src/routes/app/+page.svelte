<script lang="ts">
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte';
	import { page } from '$app/stores';
	import StoryOverviewCard from './story-overview-card.svelte';

	const urlPathStore = getUrlPathStore();
	urlPathStore.update($page.url.pathname);
</script>

<h1>App Overview page</h1>

<div class="grid grid w-full grid-cols-3 gap-4 space-y-4">
	<StoryOverviewCard />
</div>
