<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Label from '$lib/components/ui/label/label.svelte';
	import { getStoriesStore } from '$lib/pocketbase/stories.svelte';

	const storiesStore = getStoriesStore();

	let iceboxNumber = $derived.by(() => {
		let total = 0;
		for (let story of storiesStore.stories) {
			if (story.status === 'icebox') {
				total += 1;
			}
		}
		return total;
	});

	let inprogressNumber = $derived.by(() => {
		let total = 0;
		for (let story of storiesStore.stories) {
			if (story.status === 'in progress') {
				total += 1;
			}
		}
		return total;
	});

	let inreviewNumber = $derived.by(() => {
		let total = 0;
		for (let story of storiesStore.stories) {
			if (story.status === 'in review') {
				total += 1;
			}
		}
		return total;
	});

	let completedNumber = $derived.by(() => {
		let total = 0;
		for (let story of storiesStore.stories) {
			if (story.status === 'completed') {
				total += 1;
			}
		}
		return total;
	});
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>Stories</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="grid w-full grid-cols-4 items-center">
			<Label for="icebox_status">Icebox</Label>
			<span id="icebox_status">{iceboxNumber}</span>
			<Label for="inprogress_status">In Progress</Label>
			<span id="inprogress_status">{inprogressNumber}</span>
		</div>
		<div class="grid w-full grid-cols-4 items-center">
			<Label for="review_status">In Review</Label>
			<span id="review_status">{inreviewNumber}</span>
			<Label for="completed_status">Completed</Label>
			<span id="completed_status">{completedNumber}</span>
		</div>
	</Card.Content>
</Card.Root>
