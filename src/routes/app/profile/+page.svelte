<script lang="ts">
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte';
	import ProfileCard from './ProfileCard.svelte';
	import { page } from '$app/stores';
	import { getProfileStore } from '$lib/stores/profile.svelte';

	let { form } = $props();

	const profileStore = getProfileStore();

	if (form?.updatedProfile) {
		profileStore.update(form.updatedProfile);
	}

	let urlSectionStore = getUrlPathStore();
	urlSectionStore.update($page.url.pathname);
</script>

<div class="mt-4 flex flex-col space-y-4">
	<div class="grid grid-cols-2 gap-4">
		<div>
			<ProfileCard />
		</div>
		<div>
			<p>right side</p>
		</div>
	</div>
</div>
