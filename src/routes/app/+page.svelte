<script lang="ts">
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte';
	import { page } from '$app/stores';
	import StoryOverviewCard from './story-overview-card.svelte';
	import type { Story } from '$lib/models/story';
	import { getStoriesStore } from '$lib/pocketbase/stories.svelte';
	import StoryOverviewSkeleton from './story-overview-skeleton.svelte';

	let { data } = $props();
	
	let storiesStore = getStoriesStore();	
	data.stories.then((stories: Story[]) => {
		storiesStore.updateStories(stories);
	});

	const urlPathStore = getUrlPathStore();
	urlPathStore.update($page.url.pathname);
</script>

<h1>App Overview page</h1>

<div class="grid grid w-full grid-cols-3 gap-4 space-y-4">
	{#await data.stories}
		<StoryOverviewSkeleton />
	{:then}
		<StoryOverviewCard />
	{:catch}
		error
	{/await}

</div>
