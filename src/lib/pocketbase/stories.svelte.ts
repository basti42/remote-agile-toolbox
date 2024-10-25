import type { Story } from '$lib/models/story';
import { getContext, setContext } from 'svelte';

class StoriesStore {
	stories = $state<Story[]>([]);

	constructor() {
		this.stories = [];
	}

	updateStories(stories: Story[]) {
		this.stories = stories;
	}

	async addStory(newStory: Story) {
		this.stories.unshift(newStory);
	}

	async updateStoryStatus(story_id: string, oldStatus: string, newStatus: string) {

		console.log("unimplemented story status updating");
		console.log(`${story_id}: ${oldStatus} ---> ${newStatus}`);

		// fetch(`http://localhost:8082/rat/stories/${story_id}/status`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'content-type': 'application/josn',
		// 		'accept': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		from_status: oldStatus,
		// 		to_status: newStatus
		// 	})
		// })
		// .then(response => {
		// 	console.debug("ok response from POST to update story status: ", response.ok);
		// 	response.json()
		// 		.then((updatedStory: Story) => {
		// 			console.debug("updated Story: ", updatedStory);
		// 			// update the stories store
		// 			this.stories.map((story) => { if (story.uuid === updatedStory.uuid) {return updatedStory} else return story });
		// 		})
		// 		.catch(err => { console.error("error unpacking updated story ", err) });
		// })
		// .catch( err => { console.error("error updating story: ", err) });
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
