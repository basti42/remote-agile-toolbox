<script lang="ts">
	import { getUrlPathStore } from "$lib/stores/breadcrumb.svelte";
    import { page } from "$app/stores";
    import StoryOverviewCard from "./story-overview-card.svelte";

    const urlPathStore = getUrlPathStore();
    urlPathStore.update($page.url.pathname);

</script>

<h1>App Overview page</h1>

<div class="w-full grid grid grid-cols-3 space-y-4 gap-4">

    <StoryOverviewCard />

</div>


