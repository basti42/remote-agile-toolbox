<script lang="ts">
	import { getUrlPathStore } from "$lib/stores/breadcrumb.svelte";
	import ProfileCard from "./ProfileCard.svelte";
    import { page } from "$app/stores";

    let {data} = $props();

    let urlSectionStore = getUrlPathStore();
    urlSectionStore.update($page.url.pathname);

</script>

<div class="flex flex-col space-y-4 mt-4">
    <div class="grid grid-cols-2 gap-4">
        <div>
            <ProfileCard />
        </div>
        <div>
            <p>right side</p>
        </div>
    </div>
</div>

