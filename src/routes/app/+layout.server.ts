import type { UserProfile } from '$lib/models/profile.js';
import type { Team } from '$lib/models/team.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, fetch }) => {
	// at this stage there should always be a logged in user
	// if not redirect to login
	if (!locals.auth) {
		console.debug('APP layout context: Session expired.');
		throw redirect(302, '/auth/login');
	}

	// get the current user's profile for any displaying purposes
	// on first login make sure a profile is created on login route
	// const response = await fetch("http://localhost:8083/rat/profiles");
	// console.debug("response status: ", response.statusText);
	// const data = await response.json();
	// console.debug("data: ", data);


	return {
		userProfile: await (await fetch("http://localhost:8083/rat/profiles")).json() as UserProfile,
		teams: await (await fetch("http://localhost:8083/rat/teams")).json() as Team[]
	};
};
