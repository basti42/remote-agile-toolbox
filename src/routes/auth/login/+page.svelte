<script lang="ts">
	import { Github } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="grid min-h-[100dvh] w-full grid-cols-1 lg:grid-cols-2">
	<div class="ng-muted flex items-center justify-center p-6 lg:p-12">
		<div class="max-w-md space-y-4">
			<h1 class="flex flex-col gap-y-4 text-3xl font-bold tracking-tight sm:text-4xl">
				<p class="font-medium">Welcome to</p>
				<p class="italic text-lime-500">Remote Agile Toolbox</p>
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
				<form method="POST">
					<input name="token" type="hidden" />
					<Button
						class="flex w-full flex-row gap-x-4"
						href="http://localhost:8081/oauth/login/github"
					>
						<Github />
						<p>Sign in with Github</p>
					</Button>
				</form>
			</div>
		</div>
	</div>
</div>
