<script lang="ts">
	import { page } from '$app/stores';
	import { getUrlPathStore } from '$lib/stores/breadcrumb.svelte.js';


    let {data} = $props();

    const urlPathStore = getUrlPathStore();
	urlPathStore.update($page.url.pathname);


</script>


<h1>{data.story.title}</h1>

<span>TODO</span>