<script lang="ts">
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte';
	import { page } from '$app/stores';
	import StoryOverviewCard from '$lib/components/internal/overview/story-overview-card.svelte';
	import type { Story } from '$lib/models/story';
	import { getStoriesStore } from '$lib/stores/stories.svelte';
	import StoryOverviewSkeleton from '$lib/components/internal/overview/story-overview-skeleton.svelte';
	import BugOverviewCard from '$lib/components/internal/overview/bug-overview-card.svelte';
	import TeamOverviewCard from '$lib/components/internal/overview/team-overview-card.svelte';

	let { data } = $props();
	
	let storiesStore = getStoriesStore();	
	data.stories.then((stories: Story[]) => {
		storiesStore.updateStories(stories);
	});

	const urlPathStore = getUrlPathStore();
	urlPathStore.update($page.url.pathname);
</script>

<div class="flex flex-col space-y-4">

	<div class="flex flex-row items-center justify-between">
		<h1>Overview</h1>
	</div>

	<div class="grid grid w-full grid-cols-3 gap-4">
		{#await data.stories}
			<StoryOverviewSkeleton title="Team" />
			<StoryOverviewSkeleton title="Stories" />
			<StoryOverviewSkeleton title="Bugs" />
		{:then}
			<TeamOverviewCard />
			<StoryOverviewCard />
			<BugOverviewCard />
		{:catch}
			error
		{/await}
	</div>

</div>

