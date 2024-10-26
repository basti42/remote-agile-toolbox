import type { PublicUser } from "$lib/models/story";
import { getContext, setContext } from "svelte";

class PublicTeamProfilesStore {
    publicProfiles: Map<string, PublicUser> = new Map();

    // TODO implement properly

    constructor() {
        $effect(() => {
            const m = new Map<string, PublicUser>();
            m.set("8d98e580-fca2-48f2-bac3-b6e871892589", {
                uuid: "8d98e580-fca2-48f2-bac3-b6e871892589",
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