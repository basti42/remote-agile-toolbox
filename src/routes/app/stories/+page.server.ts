import type { Story } from '$lib/models/story';
import { pb } from '$lib/pocketbase';

export const load = async () => {
	let stories!: Story[];
	try {
		const response = await pb
			.collection('stories')
			.getFullList<Story>({ sort: '-created', expand: 'creator,assingee' });
		stories = response;
	} catch (error) {
		console.error('error loading stories: ', error);
	}
	return {
		stories
	};
};
