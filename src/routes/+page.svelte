<script lang="ts">
	import { Button } from "$lib/components/ui/button";
    import { getAuthContext } from "$lib/pocketbase/auth.svelte";

    const auth = getAuthContext();
    
    const signInWithGithub = async () => {
        await auth.signInWithGithub();
    }

</script>

{#if !auth.user}
    <div class="grid min-h-[100dvh] w-full grid-cols-1 lg:grid-cols-2">
        <div class="flex items-center justify-center ng-muted p-6 lg:p-12">
            <div class="max-w-md space-y-4">
                <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
                    Welcome to Remote Agile Toolbox
                </h1>
                <p class="text-muted-foreground">
                    Discover all the tools you need for your agile development process in a remote world.
                </p>
            </div>
        </div>
        <div class="flex items-center justify-center bg-background p-6 lg:p-12">
            <div class="w-full max-w-md space-y-4">
                <h2 class="text-2xl font-bold">Login</h2>
                <div class="space-y-4">
                    <Button class="w-full" onclick={signInWithGithub}>Sign in with Github</Button>
                </div>
            </div>
        </div>
    </div>
{/if}
