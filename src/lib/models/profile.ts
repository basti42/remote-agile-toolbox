export interface UserProfile {
	uuid: string;
	name: string;
	abbreviation: string;
	avatar_url: string;
	bio: string;
	quote: string;
	role: string;
	created_at: string;
	updated_at: string;
	user_uuid: string;
}

export interface PublicUser {
	uuid: string;
	name: string;
	avatar: string;
}

export interface NewProfileRequest {
	name: string;
	abbreviation: string;
	avatar_url: string;
}

export interface ProfileUpdateRequest {
	name: string;
	abbreviation: string;
	bio: string;
	quote: string;
}