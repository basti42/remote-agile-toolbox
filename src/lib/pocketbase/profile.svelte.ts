import { getContext, setContext } from "svelte";
import type { UserProfile } from "$lib/models/profile";
import { pb } from ".";


class ProfileStore {
    profile = $state<UserProfile>({} as UserProfile);

    constructor(profile: UserProfile) {
        $effect(() => {
            this.profile = profile;
        })
    }

    update(profile: UserProfile) {
        pb.collection("profiles").update<UserProfile>(profile.id, profile)
            .then(response => {
                console.debug("profile updated in db!")
                this.profile = response;
            })
            .catch(err => {
                console.error(`error updating profile=${profile.id}: ${err}`);
            })
    }    
}

const PROFILE_STORE_KEY = "profile_store";

export function setProfileStore(profile: UserProfile): ProfileStore {
    const newProfileStore = new ProfileStore(profile);
    setContext(PROFILE_STORE_KEY, newProfileStore);
    return newProfileStore;
}

export function getProfileStore() : ProfileStore {
    return getContext(PROFILE_STORE_KEY);
}

export const removeProfileContext = () => {
    setContext(PROFILE_STORE_KEY, null);
}

export type { ProfileStore };