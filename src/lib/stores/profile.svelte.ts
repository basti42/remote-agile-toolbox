import { getContext, setContext } from 'svelte';
import type { UserProfile } from '$lib/models/profile';

class ProfileStore {
	profile = $state<UserProfile>({} as UserProfile);

	constructor(profile: UserProfile) {
		$effect(() => {
			this.profile = profile;
		});
	}

	update(newProfile: UserProfile) {
		this.profile = newProfile;
	}
}

const PROFILE_STORE_KEY = 'profile_store';

export function setProfileStore(profile: UserProfile): ProfileStore {
	const newProfileStore = new ProfileStore(profile);
	return setContext(PROFILE_STORE_KEY, newProfileStore);
}

export function getProfileStore(): ProfileStore {
	return getContext(PROFILE_STORE_KEY);
}

export const removeProfileContext = () => {
	setContext(PROFILE_STORE_KEY, null);
};

export type { ProfileStore };
