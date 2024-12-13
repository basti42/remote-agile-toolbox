<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Select from '$lib/components/ui/select';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { getPublicTeamProfilesStore } from '$lib/stores/public_team_profiles.svelte';
	import { enhance } from '$app/forms';
	import {TicketPlus} from 'lucide-svelte';

	let {form = $bindable()} = $props();

	const publicTeamProfilesStore = getPublicTeamProfilesStore();

	interface SelectOption {
		value: string | null;
		label: string;
	}

	let options = publicTeamProfilesStore
		.getPublicTeamProfiles()
		.map((pub) => { return {value: pub.user_uuid, label: pub.name} as SelectOption });
	options.unshift({value: null, label: "unassigned"} as SelectOption);
	let assignee_selection = $state<SelectOption>(options[0]);

	let typeOptions = [
		{value: "story", label: "Story"},
		{value: "bug", label: "Bug"}
	] satisfies SelectOption[];
	let type_selection = $state<SelectOption>(typeOptions[0]);

	let openSheet = $state(false);
	const handleSubmit = async () => {
		console.log("closing sheet")
		openSheet = false;
	}

</script>

<Sheet.Root bind:open={openSheet}>
	<Sheet.Trigger class={buttonVariants({variant: 'outline'})}>
		<TicketPlus class="mr-2 size-4" />
		Story
	</Sheet.Trigger>
	<Sheet.Content side="right" >
		<Sheet.Header>
			<Sheet.Title>New Story</Sheet.Title>
			<Sheet.Description>Create a new story</Sheet.Description>
		</Sheet.Header>

		<form method="POST" action="?/addnewstory" use:enhance={handleSubmit}>
			<!-- form to create a new story -->
			<div class="grid gap-4 py-4">
				<!-- TITLE -->
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="new_story_title" class="text-right">Title</Label>
					<Input type="text" id="new_story_title" name="new_story_title" class="col-span-3" />
				</div>
				<!-- DESCRIPTION -->
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="new_story_description" class="text-right">Description</Label>
					<Textarea
						rows={4}
						id="new_story_description"
						name="new_story_description"
						class="col-span-3 row-span-4 resize-none"
					></Textarea>
				</div>
				<!-- ASSIGNEE -->
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="new_story_assignee" class="text-right">Assignee</Label>
					<Select.Root type="single" bind:value={assignee_selection.value as string}>
						<Select.Trigger class="col-span-3" placeholder={options[0].label}>
						</Select.Trigger>
						<Select.Content>
							{#each options as opts}
								<Select.Item value={opts.value as string}>{opts.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<Input type="hidden" name="new_story_assignee" bind:value={assignee_selection.value} />
				</div>
				<!-- TYPE -->
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="new_story_type" class="text-right">Type</Label>
					<Select.Root type="single" bind:value={type_selection.value as string} >
						<Select.Trigger class="col-span-3" placeholder={typeOptions[0].label}>
						</Select.Trigger>
						<Select.Content>
							{#each typeOptions as opts}
								<Select.Item value={opts.value}>{opts.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<Input type="hidden" name="new_story_type" bind:value={type_selection.value} />
				</div>

				<!-- SUBMIT BUTTON -->
				<div class="flex flex-row-reverse justify-between items-center">
					<Button variant="default" type="submit">Create</Button>
					<Sheet.Close>
							<Button variant="destructive">Close</Button>
					</Sheet.Close>
				</div>
			</div>
		</form>
	</Sheet.Content>
</Sheet.Root>
