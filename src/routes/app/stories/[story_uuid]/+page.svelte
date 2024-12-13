<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import {Textarea} from '$lib/components/ui/textarea';

	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Select from '$lib/components/ui/select';
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte.js';
	import { Label } from '$lib/components/ui/label';
	import { getPublicTeamProfilesStore } from '$lib/stores/public_team_profiles.svelte';
	import {getStoryTransitions, type StoryTransition} from '$lib/models/story.js';
	import { getStoriesStore } from '$lib/stores/stories.svelte';
	import { enhance } from '$app/forms';
	import { Bug, ListTodo } from 'lucide-svelte';


    let {data, form} = $props();
	let description = $state(data.selected_story.description || "");

    const urlPathStore = getUrlPathStore();
	urlPathStore.update($page.url.pathname);

	const publicTeamProfilesStore = getPublicTeamProfilesStore();
	const storiesStore = getStoriesStore();

	if (form?.updatedStory) {
		storiesStore.updateStory(form.updatedStory);
	}


	const hasChanged = $derived.by(() => {
		if (description !== data.selected_story.description) return true;
		return false;
	})

	const updateDescription = () => {
		console.log(description);
	}

	let updateStatusForm: HTMLFormElement;
	const statusOptions = getStoryTransitions(data.selected_story.status);
	let currentStatusOption = $state({value: data.selected_story.status, label: data.selected_story.status});
	let statusSelectionDisabled = $state(data.selected_story.status === "completed");

	const updateNewStoryStatus = (newStatus: string) => {
		console.log("updating story status with new status: ", newStatus);
		(updateStatusForm.elements.namedItem("new_status") as HTMLInputElement).value = newStatus;
		updateStatusForm.submit();
	}

</script>


<div class="flex flex-row w-full items-center justify-between gap-y-4 border-b-2 py-2">
	<h1 class="flex flex-row space-x-4">
		<div title={data.selected_story.type}>
			{#if data.selected_story.type === "story"}
				<ListTodo color="dodgerblue" />
			{:else }
				<Bug color="red"/>
			{/if}
		</div>
		<span>
			{data.selected_story.title}
		</span>
	</h1>
	<!-- TODO -->
	<div class="">
		<form method="POST" action="?/updateStoryStatus" 
		 bind:this={updateStatusForm} use:enhance>
			 <input type="hidden" id="story_id" name="story_id" value={data.selected_story.uuid} />
			 <input type="hidden" id="old_status" name="old_status" value={data.selected_story.status} />
			<input type="hidden" id="new_status" name="new_status" bind:value={currentStatusOption.value}/>

			<Select.Root type="single" bind:open={statusSelectionDisabled}
				bind:value={currentStatusOption.value}
				onValueChange={(v) => { updateNewStoryStatus(v as string) }}>
				<Select.Trigger class="w-[180px]" id="status_selector" placeholder={data.selected_story.status}>
				</Select.Trigger>
				<Select.Content>
					{#each getStoryTransitions(data.selected_story.status) as transition}
					<Select.Item class="cursor-pointer" 
						value={transition.value}>{transition.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</form>

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
					<Button 
						variant="outline"
						color="dodgerblue" 
						onclick={updateDescription}
					>
						Save Changes
					</Button>
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
					{ publicTeamProfilesStore.getPublicTeamProfilebyUserUUID(data.selected_story.assignee)?.name }
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