import type { PublicUser } from "$lib/models/story";
import { getContext, setContext } from "svelte";

class PublicTeamProfilesStore {
    publicProfiles: Map<string, PublicUser> = new Map();

    constructor() {
        $effect(() => {
            const m = new Map<string, PublicUser>();
            m.set("1858f3ab-9cb3-4b15-96b6-c4407cc7cfc7", {
                uuid: "1858f3ab-9cb3-4b15-96b6-c4407cc7cfc7",
                username: "Basti",
                avatar: "https://avatars.githubusercontent.com/u/24679920?v=4"
            } satisfies PublicUser);
            this.publicProfiles = m;
        });
    }

    
    getPublicTeamProfilebyUUID(uuid: string | undefined) : PublicUser | undefined {
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

export function setPublicTeamProfilesStore(): PublicTeamProfilesStore {
	const newPublicTeamProfilesStore = new PublicTeamProfilesStore();
	setContext(PUBLIC_TEAM_PROFILES_STORE, newPublicTeamProfilesStore);
	return newPublicTeamProfilesStore;
}

export function getPublicTeamProfilesStore(): PublicTeamProfilesStore {
	return getContext(PUBLIC_TEAM_PROFILES_STORE);
}