<script lang="ts">
	import { getProfileStore } from "$lib/pocketbase/profile.svelte";
    import * as DropDown from '$lib/components/ui/dropdown-menu';
    import Button from '$lib/components/ui/button/button.svelte';
    import * as Avatar from '$lib/components/ui/avatar';
    import { CircleUser, LogOut } from "lucide-svelte";


    const profileStore = getProfileStore();

</script>

<DropDown.Root>
    <DropDown.Trigger asChild let:builder>
        <!-- TODO make the button nicer or change something -->
        <Button 
            builders={[builder]}
            variant="ghost"
            class="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-background hover:bg-accent hover:text-accent-foreground border h-10 w-10 overflow-hidden rounded-full"
            >
            <Avatar.Root>
                <Avatar.Fallback>{ profileStore.profile.abbreviation }</Avatar.Fallback>
            </Avatar.Root>
        </Button>
    </DropDown.Trigger>
    <DropDown.Content>
        <DropDown.Group>
            <DropDown.Item href="/app/profile" title="Profile">
                <CircleUser />
                <span>Profile</span>
            </DropDown.Item>
            <DropDown.Item href="/auth/login" title="Logout">
                <LogOut />
                <span>Logout</span>
            </DropDown.Item>
        </DropDown.Group>
    </DropDown.Content>
</DropDown.Root>