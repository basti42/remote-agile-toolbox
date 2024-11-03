<script lang="ts">
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte';
	import { page } from '$app/stores';
	import StoryTable from './story-table.svelte';
	import { getStoriesStore } from '$lib/stores/stories.svelte';
	import NewStorySheet from '$lib/components/internal/stories/NewStorySheet.svelte';
	import { getPublicTeamProfilesStore } from '$lib/stores/public_team_profiles.svelte';
	import StoryStatusSelectorDropDown from '$lib/components/internal/stories/StoryStatusSelectorDropDown.svelte';

	let { data, form } = $props();

	const urlPathStore = getUrlPathStore();
	urlPathStore.update($page.url.pathname);

	const storiesStore = getStoriesStore();
	storiesStore.updateStories(data.stories);

	if (form?.newStory) {
		storiesStore.addStory(form.newStory);
	}

	interface SelectOption {
		value: string | null;
		label: string;
	}

	const publicTeamProfilesStore = getPublicTeamProfilesStore();
	let options = publicTeamProfilesStore
		.getPublicTeamProfiles()
		.map((pub) => { return {value: pub.uuid, label: pub.name} as SelectOption });
	options.unshift({value: null, label: "unassigned"} as SelectOption);

	let dialogOpen = $state(false);

</script>

<div class="my-4 flex w-full flex-row items-center justify-between">

	{#if storiesStore.stories.length > 0}
		<div class="flex flex-row items-center gap-x-4">
			<h1>Stories</h1>
			<div class="flex flex-row space-x-2">
				<!-- TODO -->
				<!-- <StoryStatusSelectorDropDown /> -->
			</div>

			<!-- <ToggleGroup.Root variant="outline" type="multiple" size="sm">
				<ToggleGroup.Item value="a">A</ToggleGroup.Item>
				<ToggleGroup.Item value="b">B</ToggleGroup.Item>
				<ToggleGroup.Item value="c">C</ToggleGroup.Item>
			</ToggleGroup.Root> -->
		</div>
		<NewStorySheet form={form}/>
	{:else}
		<div class="flex flex-col items-center mx-auto gap-y-4">
			<span>You don't have any stories yet,</span>
			<span> lets get started and create one</span>
			<NewStorySheet form={form}/>
		</div>
	{/if}
</div>

{#if storiesStore.stories.length > 0}
	<StoryTable stories={data.stories}/>
{/if}
