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

	updateStory(updatedStory: Story) {
		this.stories.map(story => {
			if (story.uuid === updatedStory.uuid) {
				return updatedStory
			}
			return story
		});
	}

	async addStory(newStory: Story) {
		this.stories.unshift(newStory);
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
