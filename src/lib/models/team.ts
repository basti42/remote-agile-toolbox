
export interface Team {
    uuid: string;
    owner_uuid: string;
    abbreviation: string;
    name: string;
    description: string;
    members: TeamMember[];
}

export interface TeamMember {
    user_uuid: string;
    team_uuid: string;
    role: string;
}


export interface NewTeamRequest {
    name: string;
    abbreviation: string;
}