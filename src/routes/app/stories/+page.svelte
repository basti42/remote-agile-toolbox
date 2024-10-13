<script lang="ts">
    import { getUrlPathStore } from "$lib/stores/breadcrumb.svelte";
    import { page } from "$app/stores";
    import StoryTable from "./story-table.svelte";
	import { getStoriesStore } from "$lib/pocketbase/stories.svelte";
	import NewStorySheet from "$lib/components/internal/NewStorySheet.svelte";
    import * as ToggleGroup from "$lib/components/ui/toggle-group";

    let {data} = $props();    

    const urlPathStore = getUrlPathStore();
    urlPathStore.update($page.url.pathname);

    const storiesStore = getStoriesStore();
    storiesStore.updateStories(data.stories);

</script>

<div class="w-full flex flex-row items-center justify-between my-4">
    <div class="flex flex-row items-center gap-x-4">
        <h1>Stories</h1>
        <ToggleGroup.Root variant="outline" type="multiple" size="sm">
            <ToggleGroup.Item value="a">A</ToggleGroup.Item>
            <ToggleGroup.Item value="b">B</ToggleGroup.Item>
            <ToggleGroup.Item value="c">C</ToggleGroup.Item>
        </ToggleGroup.Root>
    </div>
    <NewStorySheet />
</div>


<StoryTable />