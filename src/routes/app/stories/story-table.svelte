<script lang="ts">
	import { BrainCircuit, Dumbbell, TriangleAlert } from 'lucide-svelte';
	import * as Table from '$lib/components/ui/table';
	import * as Select from '$lib/components/ui/select';
	import { getStoriesStore } from '$lib/pocketbase/stories.svelte';
	import { getPublicTeamProfilesStore } from '$lib/stores/public_team_profiles.svelte';

	const storiesStore = getStoriesStore();
	const publicTeamProfilesStore = getPublicTeamProfilesStore();
</script>

<Table.Root class="w-full">
	<!-- <Table.Caption>Stories</Table.Caption> -->
	<Table.Header>
		<Table.Row>
			<Table.Head>ID</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Assignee</Table.Head>
			<Table.Head>Estimation</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each storiesStore.stories as story, idx}
			<Table.Row>
				<Table.Cell>{idx + 1}</Table.Cell>
				<Table.Cell class="truncate">
					<a href="/app/stories/{story.uuid}" data-sveltekit-preload-data="tap">
						{story.title}
					</a>
				</Table.Cell>
				<Table.Cell>{story.status}</Table.Cell>
				<Table.Cell>{ publicTeamProfilesStore.getPublicTeamProfilebyUUID(story.assignee)?.username || 'unassigned'}</Table.Cell>
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
