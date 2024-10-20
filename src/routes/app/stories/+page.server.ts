import type { Story } from '$lib/models/story';

export const load = async ({fetch}) => {
	let stories!: Story[];
	try {
		const response = await fetch("http://localhost:8082/rat/stories");
		const data: Story[] = await response.json();
		console.debug("stories data: ", data);
		stories = data;
	} catch (error) {
		console.error('error loading stories: ', error);
	}
	return {
		stories
	};
};
