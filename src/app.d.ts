import PocketBase from 'pocketbase';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase,
			user_id: string
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
