<script lang="ts">
    import { getUrlPathStore } from "$lib/stores/breadcrumb.svelte";
    import { page } from "$app/stores";
    import StoryTable from "./story-table.svelte";
	import { getStoriesStore } from "$lib/pocketbase/stories.svelte";

    let {data} = $props();    

    const urlPathStore = getUrlPathStore();
    urlPathStore.update($page.url.pathname);

    const storiesStore = getStoriesStore();
    storiesStore.updateStories(data.stories);

</script>

<h1>Stories and Issues</h1>

<StoryTable />