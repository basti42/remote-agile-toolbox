import type { Story } from '$lib/models/story.js';
import { error } from '@sveltejs/kit';


export const load = async ({params, fetch}) => {
    try {
        console.log("received story uuid = ", params.story_uuid);
        const respo = await fetch(`http://localhost:8082/rat/stories/${params.story_uuid}`);
        const selected_story: Story = await respo.json();
        console.log("selected_story: ", selected_story);
        return {
            selected_story
        }
    } catch(err) {
        console.error(err);
        error(404, "story does not exist");
    }
}