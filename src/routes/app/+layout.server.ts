import type { UserProfile } from '$lib/models/profile';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	// at this stage there should always be a logged in user
	// if not redirect to login
	if (!locals.auth) {
		console.debug('APP layout context: Session expired.');
		throw redirect(302, '/auth/login');
	}

	// get the current user's profile for any displaying purposes
	// on first login make sure a profile is created on login route

	return {
		userProfile: await locals.pb
		.collection('profiles')
		.getFirstListItem<UserProfile>('user_id="' + locals.auth.user.id + '"')
	};
};
