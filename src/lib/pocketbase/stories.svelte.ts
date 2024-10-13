import type { Story } from "$lib/models/story";
import { getContext, setContext } from "svelte";
import { pb } from "$lib/pocketbase";

class StoriesStore {
    stories = $state<Story[]>([]);

    constructor() {
        $effect(() => {
            pb.collection("stories").getFullList<Story>({sort: '-created', expand: "creator,assignee"})
                .then((stories) => {
                    this.stories = stories;
                })
                .catch(err => {
                    console.error("Error initializing stories store from db: ", err);
                    this.stories = [];
                })
        });
    }

    updateStories(stories: Story[]) {
        this.stories = stories;
    }

    addStory(story: Story) {
        // TODO persist story in DB
        this.stories.unshift(story);
    }
}

const STORIES_STORE_KEY = "stories_store";

export function setStoriesStore() : StoriesStore {
    const newStoriesStore = new StoriesStore();
    setContext(STORIES_STORE_KEY, newStoriesStore);
    return newStoriesStore;
}

export function getStoriesStore() : StoriesStore {
    return getContext(STORIES_STORE_KEY);
}