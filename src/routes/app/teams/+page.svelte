<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte';
	import { page } from '$app/stores';
	import { UserPlus, PencilLine } from 'lucide-svelte';
	import { getPublicTeamProfilesStore } from '$lib/stores/public_team_profiles.svelte';
	import { type PublicUser } from '$lib/models/profile.js';

	let {data} = $props();

	const urlPathStore = getUrlPathStore();
	urlPathStore.update($page.url.pathname);

	const publicProfiles = getPublicTeamProfilesStore();
	const ownerProfile = publicProfiles.getPublicTeamProfilebyUUID(data.teams[0].owner_uuid)
</script>


<div class="my-4 flex w-full flex-row items-center justify-between">
	<div class="flex flex-row items-center gap-x-4">
		<h1>Teams</h1>
	</div>	
</div>

{#await data.teams }
	<span>LOADING</span>
{:then teams}

	{#snippet memberRow(member: PublicUser)}
		<div class="flex flex-row items-center justify-between">
			<span>{member.name}</span>
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
						<span>{teams[0].name}</span>
						{#if teams[0].owner_uuid === data.userProfile.user_uuid}
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
				<div>
					<p>
						TODO: teams meta data, like description
					</p>
					<p>
						TODO: get story, bug, sprint infos for team
					</p>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
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
					{#each teams[0].members as member}
						{@render memberRow(member)}
					{/each}
				</div>
			</Card.Content>
		</Card.Root>

	</div>


{:catch err}
	<span>{err}</span>
{/await}
