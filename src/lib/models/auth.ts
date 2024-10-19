interface LoggedInUser {
	id: string;
	email: string;
	role: string;
	providers: string;
	avatar: string;
}

export interface Auth {
	access_token: string;
	user: LoggedInUser;
}
