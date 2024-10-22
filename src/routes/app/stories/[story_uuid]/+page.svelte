<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import {Textarea} from '$lib/components/ui/textarea';

	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Select from '$lib/components/ui/select';
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte.js';
	import { Label } from '$lib/components/ui/label';
	import { getPublicTeamProfilesStore } from '$lib/stores/public_team_profiles.svelte';
	import {getStoryTransitions} from '$lib/models/story.js';
	import { getStoriesStore } from '$lib/pocketbase/stories.svelte';


    let {data} = $props();
	let description = $state(data.selected_story.description);

    const urlPathStore = getUrlPathStore();
	urlPathStore.update($page.url.pathname);

	const publicTeamProfilesStore = getPublicTeamProfilesStore();
	const storiesStore = getStoriesStore();

	const hasChanged = $derived.by(() => {
		if (description !== data.selected_story.description) return true;
		return false;
	})

	const updateDescription = () => {
		console.log(description);
	}

	const updateStatus = async (newStatus: string) => {
		console.log("updated status = ", newStatus);
		await storiesStore.updateStoryStatus(
			data.selected_story.uuid,
			data.selected_story.status,
			newStatus
		)
	}

</script>


<div class="flex flex-row w-full items-center justify-between gap-y-4 border-b-2 py-2">
	<h1>{data.selected_story.title}</h1>
	<div class="">
		<Select.Root 
			onSelectedChange={(v) => { updateStatus(v?.value as string) }}>
			<Select.Trigger class="w-[180px]" id="status_selector">
				<Select.Value placeholder={data.selected_story.status} />
			</Select.Trigger>
			<Select.Content>
				{#each getStoryTransitions(data.selected_story.status) as transition}
				<Select.Item class="cursor-pointer" 
					value={transition.value}>{transition.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>


	</div>
</div>

<div class="w-full grid grid-cols-4 mt-4 gap-4">

	<Card.Root class="col-span-2">
		<Card.Header>
			<Card.Title>Description</Card.Title>
		</Card.Header>
		<Card.Content>
			<Textarea 
				bind:value={description} 
				rows={10} 
				class="resize-none" />
		</Card.Content>
		<Card.Footer>
			<div class="w-full flex flex-row justify-between items-center">
				<div class="text-sm text-slate-400 flex flex-col">
					<span>updated at</span>
					<span>{data.selected_story.updated_at.toLocaleString()}</span>
				</div>
				{#if hasChanged}
				<Button variant="secondary" onclick={updateDescription}>Save Changes</Button>
				{/if}
			</div>
		</Card.Footer>
	</Card.Root>

	<Card.Root class="col-span-2">
		<Card.Header>
			<Card.Title>Infos</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="assignee">Assignee</Label>
				<span class="cols-span-3">
					{ publicTeamProfilesStore.getPublicTeamProfilebyUUID(data.selected_story.assignee)?.username }
				</span>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="estimation">Estimation</Label>
				<span class="cols-span-3">
					{ data.selected_story.estimation || "unestimated" }
				</span>
			</div>
		</Card.Content>
	</Card.Root>

</div>
