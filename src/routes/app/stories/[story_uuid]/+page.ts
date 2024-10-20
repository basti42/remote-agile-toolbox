import type { Story } from '$lib/models/story.js';
import { error } from '@sveltejs/kit';


export const load = async ({params, fetch}) => {
    try {
        const respo = await fetch(`http://localhost:8082/rat/stories/${params.story_uuid}`);
        const story: Story = await respo.json();
        return {
            story
        }
    } catch(err) {
        console.error(err);
        error(404, "story does not exist");
    }
}