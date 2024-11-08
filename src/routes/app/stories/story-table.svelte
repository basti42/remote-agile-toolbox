<script lang="ts">
	import { BrainCircuit, Dumbbell, TriangleAlert } from 'lucide-svelte';
	import * as Table from '$lib/components/ui/table';
	import * as Select from '$lib/components/ui/select';
	import { getStoriesStore } from '$lib/stores/stories.svelte';
	import { getPublicTeamProfilesStore } from '$lib/stores/public_team_profiles.svelte';
	import {ListTodo, Bug} from 'lucide-svelte/icons'
	import type { Story } from '$lib/models/story';

	// const storiesStore = getStoriesStore();
	const publicTeamProfilesStore = getPublicTeamProfilesStore();
	let {stories} : {stories: Story[]} = $props();

</script>

<Table.Root class="w-full">
	<!-- <Table.Caption>Stories</Table.Caption> -->
	<Table.Header>
		<Table.Row>
			<Table.Head>ID</Table.Head>
			<Table.Head>Type</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Assignee</Table.Head>
			<Table.Head>Estimation</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each stories as story, idx}
			<Table.Row>
				<Table.Cell>{idx + 1}</Table.Cell>
				<Table.Cell>
					{#if story.type === "story"}
						<ListTodo color="dodgerblue" />
					{:else }
						<Bug color="red"/>
					{/if}
				</Table.Cell>
				<Table.Cell class="truncate">
					<a href="/app/stories/{story.uuid}" data-sveltekit-preload-data="tap">
						{story.title}
					</a>
				</Table.Cell>
				<Table.Cell>{story.status}</Table.Cell>
				<Table.Cell>{ publicTeamProfilesStore.getPublicTeamProfilebyUserUUID(story.assignee)?.name || 'unassigned'}</Table.Cell>
				<Table.Cell>
					{#if story.estimation}
						<div class="flex flex-row gap-x-4">
							<div title="Complexity">
								<BrainCircuit size="20" />
								<span class="text-base">{story.estimation?.complexity}</span>
							</div>
							<div title="Risk">
								<TriangleAlert size="20" />
								<span class="text-base">{story.estimation?.risk}</span>
							</div>
							<div title="Effort">
								<Dumbbell size="20" />
								<span class="text-base">{story.estimation?.effort}</span>
							</div>
						</div>
					{:else}
						<span>unestimated</span>
					{/if}
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
