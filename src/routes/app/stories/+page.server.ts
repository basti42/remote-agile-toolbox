import type { NewStory, Story } from '$lib/models/story';

export const load = async ({fetch}) => {
	let stories!: Story[];
	try {
		const response = await fetch("http://localhost:8082/rat/stories");
		const data: Story[] = await response.json();
		// console.debug("stories data: ", data);
		stories = data;
	} catch (error) {
		console.error('error loading stories: ', error);
	}
	return {
		stories
	};
};


export const actions = {
    addnewstory: async ({request, fetch}) => {
        console.debug("form action for new story creation");
		const data = await request.formData();
		const title = data.get("new_story_title");
		console.debug("\tnew story title: ", title);
		const description = data.get("new_story_description");
		console.debug("\tnew story description: ", description);
		let assignee_uuid: string | null = data.get("new_story_assignee") as string;
		if (assignee_uuid.length <= 0) { assignee_uuid = null; }
		console.debug("\tnew story assignee: ", assignee_uuid);
		const type = data.get("new_story_type");
		console.debug("\tnew story type: type");

		const newStory = {
			type: type as string,
			assignee: assignee_uuid,
			team: null,
			project: null,
			feature: null,
			status: 'icebox',
			title: title as string,
			description: description as string,
		} satisfies NewStory;

		try {
			const response = await fetch('http://localhost:8082/rat/stories', {
				method: 'POST',
				headers: {
					'content-type': 'application/josn',
					'accept': 'application/json'
				},
				body: JSON.stringify(newStory)
			});

			if (response.status !== 200) {
				console.error("error creating new story on backend: ", response.statusText);
				return {
					success: false,
					newStory: null
				}
			}

			const story: Story = await response.json();
			console.debug("successfully created new story on backend: ", story.uuid);

			return {
				success: true, 
				newStory: story
			}

		} catch (error) {
			console.debug("error creating new story on backend: ", error);
			return {
				success: false,
				newStory: null
			}
		}
    }
}