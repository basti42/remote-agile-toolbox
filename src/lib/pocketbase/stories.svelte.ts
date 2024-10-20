import type { NewStory, Story } from '$lib/models/story';
import { getContext, setContext } from 'svelte';

class StoriesStore {
	stories = $state<Story[]>([]);

	constructor() {
		$effect(() => {
			fetch("http://localhost:8082/rat/stories")
				.then(resp => { 
					resp.json()
						.then(stories => this.stories = stories)
						.catch(err => {
							console.error("error unpacking intital stories: ", err);
						})
				 }).catch(err => {
					console.error("error loading initial stories data: ", err);
				 });
		});
	}

	updateStories(stories: Story[]) {
		this.stories = stories;
	}

	async addStory(newStory: NewStory) {
		fetch('http://localhost:8082/rat/stories', {
			method: 'POST',
			// headers: {
			// 	'content-type': 'application/josn',
			// 	'accept': 'application/json'
			// },
			body: JSON.stringify(newStory)
		})
		.then(response => {
			console.debug("ok response from POST create new story: ", response.ok);
			response.json()
				.then((story: Story) => { 
					console.debug("added new story: ", story);
					this.stories.unshift(story) })
				.catch(err => { console.error("error unpacking new story: ", err); });
		}).catch(err => {
			console.error("error adding new story: ", err);
		});
	}

	updateStoryStatus(story_id: string, newStatus: string) {

		console.debug("unimplemented update story status ", story_id, newStatus,);
		// pb.collection('stories')
		// 	.update<Story>(story_id, { status: newStatus })
		// 	.then((updatedStory) => {
		// 		const idx = this.stories.findIndex((s) => s.uuid === story_id);
		// 		this.stories[idx] = updatedStory;
		// 	})
		// 	.catch((err) => {
		// 		console.error(`error updating story=${story_id}: ${err}`);
		// 	});
	}
}

const STORIES_STORE_KEY = 'stories_store';

export function setStoriesStore(): StoriesStore {
	const newStoriesStore = new StoriesStore();
	setContext(STORIES_STORE_KEY, newStoriesStore);
	return newStoriesStore;
}

export function getStoriesStore(): StoriesStore {
	return getContext(STORIES_STORE_KEY);
}
