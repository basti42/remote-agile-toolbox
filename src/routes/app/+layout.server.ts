import type { NewProfileRequest, PublicUser, UserProfile } from '$lib/models/profile.js';
import type { NewTeamRequest, Team } from '$lib/models/team.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, fetch }) => {
	// at this stage there should always be a logged in user
	// if not redirect to login
	if (!locals.auth) {
		console.debug('APP layout context: Session expired.');
		throw redirect(302, '/auth/login');
	}

	// console.log("app.layout.server: user from auth: ", locals.auth.user);

	let profileResponse = await fetch("http://localhost:8083/rat/profiles");
	if (profileResponse.status !== 200) {
		console.log("\tno profile found for user, trying to create one");
	
		const split = locals.auth.user.email.split('@'); 
		const name = split.at(0) as string;
		const abbreviation = name?.substring(0, 2);
		profileResponse = await fetch("http://localhost:8083/rat/profiles", {
			method: "POST",
			body: JSON.stringify({
				name: name,
				abbreviation: abbreviation,
				avatar_url: locals.auth.user.avatar
			} satisfies NewProfileRequest)
		});
	}

	let teamResponse = await fetch("http://localhost:8083/rat/teams");
	if (teamResponse.status !== 200 || (await (await teamResponse.clone()).json()).length <= 0 ) {
		console.log("\tno team found for user, trying to create one");

		const split = locals.auth.user.email.split('@'); 
		const name = split.at(0) as string;
		teamResponse = await fetch("http://localhost:8083/rat/teams", {
			method: "POST",
			body: JSON.stringify({
				name: name + "'s Team",
				abbreviation: "RAT"
			} satisfies NewTeamRequest)
		})
	} 
	const teams = await teamResponse.json() as Team[];
	const team = teams[0];

	const publicProfileResponse = await fetch(`http://localhost:8083/rat/teams/${team.uuid}/public-profiles`);
	// console.log("public profile response: ", publicProfileResponse);
	const publicProfiles = await publicProfileResponse.json() as PublicUser[]; 
	// console.log("public profiles: ", publicProfiles);


	return {
		userProfile: await profileResponse.json() as UserProfile,
		team: team,
		publicTeamMemberProfiles: publicProfiles
	};
};
