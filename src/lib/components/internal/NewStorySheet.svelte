<script lang="ts">
    import * as Sheet from '$lib/components/ui/sheet';
    import { Button } from '$lib/components/ui/button';
    import Label from '$lib/components/ui/label/label.svelte';
    import Input from '$lib/components/ui/input/input.svelte';
    import { Textarea } from '$lib/components/ui/textarea';
	import { getStoriesStore } from '$lib/pocketbase/stories.svelte';
	import { getProfileStore } from '$lib/pocketbase/profile.svelte';
	import type { NewStory } from '$lib/models/story';

    const storiesStore = getStoriesStore();
    const profileStore = getProfileStore();

    let title = $state("");
    let description = $state("");

    const handleCreateStory = () => {
        const newStory = {
            creator: profileStore.profile.user_id,
            team: "RAT Dev Team",
            project: "RAT",
            title,
            description,
            status: "icebox"
        } satisfies NewStory;
        storiesStore.addStory(newStory);
    }

</script>

<Sheet.Root>
    <Sheet.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline">+Story</Button>
    </Sheet.Trigger>
    <Sheet.Content side="right">
        <Sheet.Header>
            <Sheet.Title>New Story</Sheet.Title>
            <Sheet.Description>Create a new story</Sheet.Description>
        </Sheet.Header>

        <!-- form to create a new story -->
        <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="title" class="text-right">Title</Label>
              <Input id="title" bind:value={title} class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="description" class="text-right">Description</Label>
              <Textarea 
                rows={4}
                id="description" 
                bind:value={description} 
                class="col-span-3 row-span-4 resize-none" />
            </div>
          </div>

          <Sheet.Footer>
            <Sheet.Close asChild let:builder>
                <Button builders={[builder]} onclick={handleCreateStory}>Create</Button>
              </Sheet.Close>
          </Sheet.Footer>

    </Sheet.Content>
</Sheet.Root>