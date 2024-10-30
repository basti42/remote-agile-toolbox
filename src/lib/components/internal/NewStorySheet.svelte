<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { getPublicTeamProfilesStore } from '$lib/stores/public_team_profiles.svelte';
	import { enhance } from '$app/forms';

	let {form = $bindable()} = $props();

	const publicTeamProfilesStore = getPublicTeamProfilesStore();

	interface SelectOption {
		value: string | null;
		label: string;
	}

	let options = publicTeamProfilesStore
		.getPublicTeamProfiles()
		.map((pub) => { return {value: pub.uuid, label: pub.name} as SelectOption });
	options.unshift({value: null, label: "unassigned"} as SelectOption);
	let assignee_selection = $state<SelectOption>(options[0]);

	let openSheet = $state(false);
	const handleSubmit = async () => {
		console.log("closing sheet")
		openSheet = false;
	}

</script>

<Sheet.Root bind:open={openSheet}>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">+Story</Button>
	</Sheet.Trigger>
	<Sheet.Content side="right" >
		<Sheet.Header>
			<Sheet.Title>New Story</Sheet.Title>
			<Sheet.Description>Create a new story</Sheet.Description>
		</Sheet.Header>

		<form method="POST" action="?/addnewstory" use:enhance={handleSubmit}>
			<!-- form to create a new story -->
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="new_story_title" class="text-right">Title</Label>
					<Input type="text" id="new_story_title" name="new_story_title" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="new_story_description" class="text-right">Description</Label>
					<Textarea
						rows={4}
						id="new_story_description"
						name="new_story_description"
						class="col-span-3 row-span-4 resize-none"
					></Textarea>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="new_story_assignee" class="text-right">Assignee</Label>
					<!-- <select id="new_story_assignee" name="new_story_assignee" class="select">
						{#each options as opts}
							<option value={opts.value}>{opts.label}</option>
						{/each}						
					</select> -->
					<Select.Root bind:selected={assignee_selection} >
						<Select.Trigger class="col-span-3">
							<Select.Value placeholder={options[0].label}></Select.Value>
						</Select.Trigger>
						<Select.Content>
							{#each options as opts}
								<Select.Item value={opts.value}>{opts.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<Input type="hidden" name="new_story_assignee" bind:value={assignee_selection.value} />
				</div>
				<div class="flex flex-row-reverse justify-between items-center">
					<Button variant="default" type="submit">Create</Button>
					<Sheet.Close asChild let:builder>
						<Button variant="destructive" builders={[builder]}>Close</Button>
					</Sheet.Close>
				</div>
			</div>
		</form>
	</Sheet.Content>
</Sheet.Root>
