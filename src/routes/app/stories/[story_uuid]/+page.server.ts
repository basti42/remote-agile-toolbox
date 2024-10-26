import type { Story } from '$lib/models/story.js';
import { error } from '@sveltejs/kit';


export const load = async ({params, fetch}) => {
    try {
        console.log("received story uuid = ", params.story_uuid);
        const respo = await fetch(`http://localhost:8082/rat/stories/${params.story_uuid}`);

        // TODO error handling 
        const selected_story: Story = await respo.json();
        // console.log("selected_story: ", selected_story);
        return {
            selected_story
        }
    } catch(err) {
        console.error(err);
        error(404, "story does not exist");
    }
}

export const actions = {
    updateStoryStatus: async ({request, fetch}) => {
        const data = await request.formData();
        const oldStatus = data.get("old_status");
        const newStatus = data.get("new_status");
        const story_id = data.get("story_id");
        console.debug(`old status=${oldStatus} --> new status=${newStatus}`);

        try {
            const response = await fetch(`http://localhost:8082/rat/stories/${story_id}/status`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/josn',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    from_status: oldStatus,
                    to_status: newStatus
                })
            });

            if (response.status !== 200) {
                console.error("error updating story in backend");
                throw new Error("received non-200 status code form backend: "+response.status);
            }

            const updatedStory = await response.json();

            return {
                success: true,
                updatedStory
            }
        } catch (error) {
            console.error(error);
            return {
                success: false, 
                updatedStory: null,
            }
        }
    }, 
}
