<script lang="ts">
	import { Button } from '$lib/components/ui/button';

</script>

<class class="lg:grif-cols-2 grid min-h-[100dvh] w-full grid-cols-1">
	<div class="flex items-center justify-center bg-muted p-6 lg:p-12">
		<div class="max-w-md space-y-4">
			<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Sorry, something went wrong.</h1>
			<p class="text-muted-foreground">You were logged out, please log in again.</p>
			<Button href="/auth/login">Sign In with Github</Button>
		</div>
	</div>
</class>
