<script lang="ts">
	import { getProfileStore } from '$lib/stores/profile.svelte';
	import * as DropDown from '$lib/components/ui/dropdown-menu';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { CircleUser, LogOut } from 'lucide-svelte';

	const profileStore = getProfileStore();
</script>

<DropDown.Root>
	<DropDown.Trigger>
			<!-- <Button
				title={profileStore.profile.name}
				variant="ghost"
				class="inline-flex h-10 w-10 items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			> -->
				<Avatar.Root>
					<Avatar.Image src="{profileStore.profile.avatar_url}"></Avatar.Image>
					<Avatar.Fallback>{profileStore.profile.abbreviation}</Avatar.Fallback>
				</Avatar.Root>
			<!-- </Button> -->
		</DropDown.Trigger>
	<DropDown.Content>
		<DropDown.Group>
			<DropDown.Item title="Profile" data-sveltekit-preload-data="tap" class="cursor-pointer">
				<a href="/app/profile" class="flex flex-row items-center gap-x-2">
					<CircleUser />
					<span>Profile</span>
				</a>
			</DropDown.Item>
			<DropDown.Item title="Logout" data-sveltekit-preload-data="tap" class="cursor-pointer">
				<a href="/auth/logout" class="flex flex-row items-center gap-x-2">
					<LogOut />
					<span>Logout</span>				
				</a>
			</DropDown.Item>
		</DropDown.Group>
	</DropDown.Content>
</DropDown.Root>
