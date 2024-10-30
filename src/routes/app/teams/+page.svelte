<script lang="ts">
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte';
	import { page } from '$app/stores';

	let {data} = $props();

	const urlPathStore = getUrlPathStore();
	urlPathStore.update($page.url.pathname);
</script>


<div class="my-4 flex w-full flex-row items-center justify-between">
	<div class="flex flex-row items-center gap-x-4">
		<h1>Teams</h1>
	</div>	
</div>

{#await data.teams }
	<span>LOADING</span>
{:then teams}
	<span>{teams[0].name}</span>
{:catch err}
	<span>{err}</span>
{/await}


