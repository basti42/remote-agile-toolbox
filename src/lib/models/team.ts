import type { PublicUser } from "./profile";

export interface Team {
    uuid: string;
    owner_uuid: string;
    abbreviation: string;
    name: string;
    members: PublicUser[];
}