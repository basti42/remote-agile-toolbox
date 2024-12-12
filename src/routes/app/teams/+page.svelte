<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte';
	import { page } from '$app/stores';
	import { UserPlus, PencilLine } from 'lucide-svelte';
	import { getPublicTeamProfilesStore } from '$lib/stores/public_team_profiles.svelte';
	import { type PublicUser } from '$lib/models/profile.js';
	import type { Team, TeamMember } from '$lib/models/team.js';

	let {data} = $props();

	let {teams} : {teams: Team[]} = data;
	let team = teams[0];
	// console.log("selected Team: ", team);

	const urlPathStore = getUrlPathStore();
	urlPathStore.update($page.url.pathname);

	const publicProfiles = getPublicTeamProfilesStore();
	const ownerProfile = publicProfiles.getPublicTeamProfilebyUserUUID(team.members[0].user_uuid);

	// console.log("owner profile: ", ownerProfile);

</script>


<div class="my-4 flex w-full flex-row items-center justify-between">
	<div class="flex flex-row items-center gap-x-4">
		<h1>Teams</h1>
	</div>	
</div>

{#await data.teams }
	<span>LOADING</span>
{:then teams}

	{#snippet memberRow(member: TeamMember)}
		<div class="flex flex-row items-center justify-between">
			<span>{publicProfiles.getPublicTeamProfilebyUserUUID(member.user_uuid)?.name}</span>
			<select class="select p-1 border-rounded">
				<option selected>Dev Team</option>
				<option>PO</option>
			</select>
		</div>
	{/snippet}

	<div class="grid grid-cols-3 gap-4">

		<Card.Root class="col-span-2">
			<Card.Header>
				<Card.Title>
					<div class="flex flex-row items-center justify-between">
						<span>{team.name}</span>
						{#if team.owner_uuid === data.userProfile.user_uuid}
							<!-- TODO edit dialog for team creator -->
							<PencilLine color="orange"/>
						{/if}
					</div>
				</Card.Title>
				<Card.Description>
					<p class="text-sm">
						created by 
						<span class="italic">{ownerProfile?.name}</span>
					</p>
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="text-ellipsis overflow-hidden space-y-4">
						{team.description}
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root class="row-span-2">
			<Card.Header>
				<Card.Title>
					<div class="flex flex-row items-center justify-between">
						<span>Members</span>
						{#if teams[0].owner_uuid === data.userProfile.user_uuid}
							<!-- TODO dialog to enter a new users email -->
							<UserPlus color="green" />
						{/if}
					</div>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col">
					{#each team.members as member}
						{@render memberRow(member)}
					{/each}
				</div>
			</Card.Content>
		</Card.Root>

		<!-- 2nd row -->
		 <Card.Root>
			<Card.Header>
				<Card.Title>
					<span>Stories in {team.name}</span>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<span>TODO</span>
			</Card.Content>
		 </Card.Root>

		 <Card.Root>
			<Card.Header>
				<Card.Title>
					<span>Bugs in {team.name}</span>
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<span>TODO</span>
			</Card.Content>
		 </Card.Root>


	</div>


{:catch err}
	<span>{err}</span>
{/await}
