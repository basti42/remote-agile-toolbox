<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import {Skeleton} from '$lib/components/ui/skeleton';
	import {Label} from '$lib/components/ui/label';
	import { Users } from 'lucide-svelte';
	import { getTeamsStore } from '$lib/stores/teams.svelte';

	const teamsStore = getTeamsStore();
	const team = $state(teamsStore.teams[0]);

</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>
			<div class="flex flex-row items-center gap-x-4">
				<Users />
				<span>Team</span>
			</div>
		</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="grid w-full grid-cols-4 items-center gap-4">
			<Label for="team_name">Name</Label>
			<span class="grid col-span-3">{team.name}</span>
		</div>
		<div class="grid w-full grid-cols-4 items-center gap-4">
			<Label for="team_members">#Members</Label>
			<span class="grid col-span-3">{team.members.length}</span>
		</div>
	</Card.Content>
</Card.Root>
