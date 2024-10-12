<script lang="ts">
	import type { UserProfile } from "$lib/models/profile";
    import * as Card from '$lib/components/ui/card';
	import { Label } from "$lib/components/ui/label";
	import { Input } from "$lib/components/ui/input";
	import Button from "$lib/components/ui/button/button.svelte";
	import { getProfileStore } from "$lib/pocketbase/profile.svelte";

    let profileStore = getProfileStore();

    let tmpProfile = $state({
        id: profileStore.profile.id,
        display_name: profileStore.profile.display_name,
        abbreviation: profileStore.profile.abbreviation,
        bio: profileStore.profile.bio,
        quote: profileStore.profile.quote,
        role: profileStore.profile.role,
        created: profileStore.profile.created,
        updated: profileStore.profile.updated
    } satisfies UserProfile);

    const updateProfile = () => {
        console.debug("trying to update with profile: ", tmpProfile);
        profileStore.update(tmpProfile);
    }

</script>

<form>
    <Card.Root class="w-full">
        <Card.Header>
            <Card.Title class="flex flex-row justify-between items-center border-b-2 py-2">
                <div>
                    {profileStore.profile.display_name}
                </div>
                <div class="flex flex-col">
                    <p class="text-sm font-thin">created</p>
                    <p class="text-sm font-thin">{new Date(profileStore.profile.created).toLocaleString()}</p>
                </div>
            </Card.Title>
            <Card.Description class="text-md font-thin">{"\"" +  profileStore.profile.quote + "\"" || "\"your wisdom could be displayed here\""}</Card.Description>
        </Card.Header>
        <Card.Content>
            <Input id="projectId" type="hidden" />
                <div class="grid w-full items-center gap-4">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="name" class="text-sm font-light">
                            Name
                            <!-- <span class="text-sm font-thin">How do you want to be know?</span> -->
                        </Label>
                        <Input id="name" bind:value={tmpProfile.display_name} />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="abbreviation" class="text-sm font-light">
                            Abbreviation
                            <!-- <span class="text-sm font-thin">How would you like your name to be abbreviated?</span> -->
                        </Label>
                        <Input id="abbreviation" bind:value={tmpProfile.abbreviation} />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="bio" class="text-sm font-light">
                            Bio
                            <!-- <span class="text-sm font-thin">Let others know something about you</span> -->
                        </Label>
                        <Input id="bio" bind:value={tmpProfile.bio} />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="quote" class="text-sm font-light">
                            Quote
                            <!-- <span class="text-sm font-thin">Your Tagline</span> -->
                        </Label>
                        <Input id="quote" bind:value={tmpProfile.quote} />
                    </div>
                </div>
        </Card.Content>
        <Card.Footer class="flex flex-row justify-between items-center">
            <div class="flex flex-col">
                <p class="text-sm font-thin">last updated</p>
                <p class="text-sm font-thin">{new Date(profileStore.profile.updated).toLocaleString()}</p>
            </div>
            <div>
                <Button onclick={updateProfile}>Update</Button>
            </div>
        </Card.Footer>
    </Card.Root>
</form>
