import type { NewStory, Story } from "$lib/models/story";
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

    addStory(newStory: NewStory) {
        pb.collection("stories").create<Story>({
            count: this.stories.length + 1,
            title: newStory.title,
            description: newStory.description,
            status: newStory.status,
            team: newStory.team,
            project: newStory.project,
            creator: newStory.creator
        })
            .then(story => {
                this.stories.unshift(story);
            })
            .catch(err => {
                console.error("error creating story in db: ", err);
            });
    }

    updateStoryStatus(story_id: string, newStatus:string) {
        pb.collection("stories").update<Story>(story_id, {"status": newStatus})
            .then(updatedStory => {
                const idx = this.stories.findIndex(s => s.id === story_id);
                this.stories[idx] = updatedStory;
            })
            .catch(err => {
                console.error(`error updating story=${story_id}: ${err}`);
            })
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