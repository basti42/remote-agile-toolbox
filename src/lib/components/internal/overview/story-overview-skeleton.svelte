<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import {Skeleton} from '$lib/components/ui/skeleton';
	import {Label} from '$lib/components/ui/label';
	import { Loader } from 'lucide-svelte';

	let {title} = $props();

</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>
			<div class="flex flex-row items-center gap-x-4">
				<Loader />
				<span>{title}</span>
			</div>
		</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="grid w-full grid-cols-4 items-center gap-4">
			<Label for="icebox_status">Icebox</Label>
			<Skeleton class="w-[80px] h-4"/>
			<Label for="inprogress_status">In Progress</Label>
			<Skeleton class="w-[80px] h-4"/>
		</div>
		<div class="grid w-full grid-cols-4 items-center gap-4">
			<Label for="review_status">In Review</Label>
			<Skeleton class="w-[80px] h-4"/>
			<Label for="completed_status">Completed</Label>
			<Skeleton class="w-[80px] h-4"/>
		</div>
	</Card.Content>
</Card.Root>
