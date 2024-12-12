<script lang="ts">
	import { enhance } from '$app/forms';
    import * as Select from '$lib/components/ui/select';
    import Input from '../../ui/input/input.svelte';

    const storyStatusOptions = [
        {value: "all", label: "All"},
        {value: "icebox", label: "Icebox"},
        {value: "in progress", label: "In Progress"},
        {value: "in review", label: "In Review"},
        {value: "completed", label: "Completed"},
    ]
    let selectedStoryStatus = $state(storyStatusOptions[0]);

    let value = $state([] as string[]);

    const triggerContent = $derived(
        storyStatusOptions.find((statusOpt) => value.includes(statusOpt.value))?.label ?? "Chose a Status filter"
  );

</script>

<form method="POST" action="updateStoryStatusFilter" class="w-[180px] p-0" use:enhance>
    <Select.Root 
        type="multiple"
        bind:value>
        <Select.Trigger class="w-[180px]">
            {triggerContent}
        </Select.Trigger>
        <Select.Group>
            {#each storyStatusOptions as opts}
                <Select.Item value={opts.value}>{opts.label}</Select.Item>
            {/each}
        </Select.Group>
    </Select.Root>
    <Input type="hidden" name="story_status_filter" id="story_status_filter" bind:value={selectedStoryStatus} />
</form>
