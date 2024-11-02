<script lang="ts">
	import { Users, Milestone, House, Ticket } from 'lucide-svelte';
	import BreadCrumb from '$lib/components/internal/BreadCrumb.svelte';
	import { setProfileStore } from '$lib/stores/profile.svelte.js';
	import { setUrlPathStore } from '$lib/stores/breadcrumb.svelte.js';
	import { Input } from '$lib/components/ui/input';
	import AvatarDropDown from '$lib/components/internal/AvatarDropDown.svelte';
	import { setStoriesStore } from '$lib/stores/stories.svelte.js';
	import { setPublicTeamProfilesStore } from '$lib/stores/public_team_profiles.svelte.js';
	import { setTeamsStore } from '$lib/stores/teams.svelte';

	// user profile is being loaded in layout for entire /app context
	let { data, children } = $props();
	let { userProfile, teams } = data;

	console.debug("app.layoutt: gotten new userProfile and teams: ", userProfile, teams);

	setProfileStore(userProfile);
	const teamsStore = setTeamsStore(teams);
	setUrlPathStore();
	setStoriesStore();
	setPublicTeamProfilesStore(teamsStore.getOwnTeams(userProfile.user_uuid)[0].members);
</script>

<div class="h-full w-full">
	<div class="flex min-h-screen w-full flex-col bg-muted/40">
		<aside
			class="insert-y-0 fixed left-0 z-10 hidden h-full w-14 flex-col border-r bg-background sm:flex"
		>
			<nav class="flex flex-col items-center gap-8 px-2 sm:py-5">
				<a href="/app" title="Home">
					<House />
				</a>
				<a href="/app/stories" title="Stories">
					<Ticket />
				</a>
				<a href="/app/teams" title="Teams">
					<Users />
				</a>
				<a href="/app/plannings" title="Planning">
					<Milestone />
				</a>
			</nav>
			<nav class="gap-4px-2 mt-auto flex flex-col items-center sm:py-5">
				<!-- <AvatarDropDown /> -->
			</nav>
		</aside>
		<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
			<header
				class="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
			>
				<div class="flex flex-row">
					<BreadCrumb />
				</div>
				<div class="flex flex-row space-x-4">
					<Input id="search" />
					<AvatarDropDown />
				</div>
			</header>
			<main class="w-full flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				{@render children()}
			</main>
		</div>
	</div>
</div>
