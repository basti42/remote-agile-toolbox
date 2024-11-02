<script lang="ts">
	import type { UserProfile } from '$lib/models/profile';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getProfileStore } from '$lib/stores/profile.svelte';
	import { enhance } from '$app/forms';

	let profileStore = getProfileStore();

	let tmpProfile = $state({
		uuid: profileStore.profile.uuid,
		user_uuid: profileStore.profile.user_uuid,
		name: profileStore.profile.name,
		abbreviation: profileStore.profile.abbreviation,
		avatar_url: profileStore.profile.avatar_url,
		bio: profileStore.profile.bio,
		quote: profileStore.profile.quote,
		role: profileStore.profile.role,
		created_at: profileStore.profile.created_at,
		updated_at: profileStore.profile.updated_at
	} satisfies UserProfile);


	let profileUpdateForm: HTMLFormElement;
	const updateProfile = () => {
		console.debug('trying to update with profile: ', tmpProfile);
		profileUpdateForm.submit()

		// profileStore.update(tmpProfile);
	};
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title class="flex flex-row items-center justify-between border-b-2 py-2">
			<div>
				{profileStore.profile.name}
			</div>
			<div class="flex flex-col">
				<p class="text-sm font-thin">created</p>
				<p class="text-sm font-thin">{new Date(profileStore.profile.created_at).toLocaleString()}</p>
			</div>
		</Card.Title>
		<Card.Description class="text-md font-thin"
			>{'"' + profileStore.profile.quote + '"' ||
				'"your wisdom could be displayed here"'}</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<Input id="projectId" type="hidden" />
		<form action="?/updateProfile" method="POST" bind:this={profileUpdateForm} use:enhance>
			<input type="hidden" id="profile_uuid" name="profile_uuid" value={profileStore.profile.uuid} />
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label for="name" class="text-sm font-light">
						Name
						<Input id="name" name="name" bind:value={tmpProfile.name} />
					</Label>
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="abbreviation" class="text-sm font-light">
						Abbreviation
						<Input id="abbreviation" name="abbreviation" bind:value={tmpProfile.abbreviation} />
					</Label>
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="bio" class="text-sm font-light">
						Bio
						<Input id="bio" name="bio" bind:value={tmpProfile.bio} />
					</Label>
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="quote" class="text-sm font-light">
						Quote
						<Input id="quote" name="quote" bind:value={tmpProfile.quote} />
					</Label>
				</div>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="flex flex-row items-center justify-between">
		<div class="flex flex-col">
			<p class="text-sm font-thin">last updated</p>
			<p class="text-sm font-thin">{new Date(profileStore.profile.updated_at).toLocaleString()}</p>
		</div>
		<div>
			<Button onclick={updateProfile}>Update</Button>
		</div>
	</Card.Footer>
</Card.Root>
