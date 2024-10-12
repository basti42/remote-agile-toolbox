import type { UserProfile } from '$lib/models/profile.js';
import { redirect } from '@sveltejs/kit';
import type { AuthModel } from 'pocketbase';

export const load = async ({locals}) => {

    // at this stage there should always be a logged in user
    // if not redirect to login
    if (!locals.pb.authStore.isValid || !locals.pb.authStore.model) {
        console.debug("APP layout context: Session expired.")
        throw redirect(302, "/auth/login");
    }

    // get the current user's profile for any displaying purposes 
    // create one if none exists yet
    const currentUser: AuthModel = locals.pb.authStore.model;

    let profile! : UserProfile;
    try {
        profile = await locals.pb.collection("profiles").getFirstListItem<UserProfile>('user_id="'+currentUser?.id + '"')
        // console.debug(`found profile for user with ID=${currentUser?.id}: `, profile);
    } catch (err) {
        console.debug(`No profile found for user with ID=${currentUser?.id}. Error: ${err}`);
        // console.debug("trying to create one");
        const newProfile = {
            display_name: currentUser?.username,
            abbreviation: currentUser?.username.substring(0, 2).toUpperCase(),
            bio: "",
            quote: "",
            role: "user",
            user_id: currentUser.id
        };

        try {
            profile = await locals.pb.collection("profiles").create<UserProfile>(newProfile);
        } catch (err) {
            console.log(`error creating new profile: ${err}`);
        }
    } 
    return {
        userProfile: profile
    }

}