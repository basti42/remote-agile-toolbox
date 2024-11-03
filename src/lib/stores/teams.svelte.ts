import type { Team } from "$lib/models/team";
import { setContext, getContext } from "svelte";


class TeamsStore {
    teams: Team[] = $state([]);

    constructor(teams: Team[]) {
            this.teams = teams;
    }

    getOwnTeams(userUUID: string) : Team[] {
        return this.teams.filter((team) => { return team.owner_uuid === userUUID })
    }
}


const TEAMS_STORE_KEY = "teams_store_key"
export type {TeamsStore};

export function setTeamsStore(teams: Team[]) : TeamsStore {
    const teamsStore = new TeamsStore(teams);
    return setContext(TEAMS_STORE_KEY, teamsStore);
}

export function getTeamsStore() : TeamsStore {
    return getContext(TEAMS_STORE_KEY);
}