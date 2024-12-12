import type { PublicUser } from "$lib/models/profile";
import { getContext, setContext } from "svelte";

class PublicTeamProfilesStore {
    publicProfiles: Map<string, PublicUser> = $state(new Map());

    // TODO implement properly

    constructor(publicProfiles: PublicUser[]) {
        const m = new Map<string, PublicUser>();
        for (const pub of publicProfiles) {
            m.set(pub.user_uuid, pub);
        }
        this.publicProfiles = m;
    }

    
    getPublicTeamProfilebyUserUUID(uuid: string | undefined) : PublicUser | undefined {
        if (uuid === undefined) {
            return undefined
        }
        return this.publicProfiles.get(uuid)!;
    }

    getPublicTeamProfiles() : PublicUser[] {
        const profiles: PublicUser[] = [];
        this.publicProfiles.forEach((value) => { profiles.push(value) });
        return profiles;
    }
    

}

const PUBLIC_TEAM_PROFILES_STORE = 'public_team_profiles_store';
export type { PublicTeamProfilesStore as PublicTeamProfileStore };

export function setPublicTeamProfilesStore(publicProfiles: PublicUser[]): PublicTeamProfilesStore {
	const newPublicTeamProfilesStore = new PublicTeamProfilesStore(publicProfiles);
	return setContext(PUBLIC_TEAM_PROFILES_STORE, newPublicTeamProfilesStore);
}

export function getPublicTeamProfilesStore(): PublicTeamProfilesStore {
	return getContext(PUBLIC_TEAM_PROFILES_STORE);
}