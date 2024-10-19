import type { Auth } from '$lib/models/auth';
import PocketBase from 'pocketbase';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: Auth | null,
			pb: PocketBase
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
