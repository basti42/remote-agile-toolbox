<script lang="ts">
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte';
	import { page } from '$app/stores';

	const urlPathStore = getUrlPathStore();
	urlPathStore.update($page.url.pathname);
</script>

<h1>Plannings and Roadmaps</h1>
