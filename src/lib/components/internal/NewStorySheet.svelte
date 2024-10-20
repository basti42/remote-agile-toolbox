<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { getStoriesStore } from '$lib/pocketbase/stories.svelte';
	import type { NewStory } from '$lib/models/story';
	import { getPublicTeamProfilesStore } from '$lib/stores/public_team_profiles.svelte';

	const storiesStore = getStoriesStore();
	const publicTeamProfilesStore = getPublicTeamProfilesStore();

	let title = $state('');
	let description = $state('');
	let assignee_uuid = $state<string|null>(null);

	interface SelectOption {
		value: string | null;
		label: string;
	}

	let options = publicTeamProfilesStore
		.getPublicTeamProfiles()
		.map((pub) => { return {value: pub.uuid, label: pub.username} as SelectOption });
	options.unshift({value: null, label: "unassigned"} as SelectOption);

	const handleCreateStory = () => {
		const newStory = {
			assignee: assignee_uuid,
			team: null,
			project: null,
			feature: null,
			title,
			description,
			status: 'icebox'
		} satisfies NewStory;
		storiesStore.addStory(newStory);
		title = "";
		description = "";
		assignee_uuid = null;
	};
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">+Story</Button>
	</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>New Story</Sheet.Title>
			<Sheet.Description>Create a new story</Sheet.Description>
		</Sheet.Header>

		<!-- form to create a new story -->
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="title" class="text-right">Title</Label>
				<Input id="title" bind:value={title} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="description" class="text-right">Description</Label>
				<Textarea
					rows={4}
					id="description"
					bind:value={description}
					class="col-span-3 row-span-4 resize-none"
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="assignee" class="text-right">Assignee</Label>
				<Select.Root onSelectedChange={(v) => { assignee_uuid = v?.value as string }} >
					<Select.Trigger class="col-span-3">
						<Select.Value placeholder="unassigned"></Select.Value>
					</Select.Trigger>
					<Select.Content>
						{#each options as opts}
							<Select.Item value={opts.value}>{opts.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} onclick={handleCreateStory}>Create</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
