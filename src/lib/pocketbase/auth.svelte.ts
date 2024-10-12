import type { AuthModel } from 'pocketbase';
import { pb } from '.';
import { getContext, setContext } from 'svelte';
import { goto } from '$app/navigation';

class AuthStore {
    user = $state<AuthModel | null>(null);
    isSynced = $state(false);

    constructor() {
        // runs on mount
        $effect(() => {
            if (pb.authStore.isValid) {
                this.user = pb.authStore.model;
            }
            this.isSynced = true;
        });
    }

    async signInWithGithub() {
        this.user = (await pb.collection("users").authWithOAuth2({provider: 'github'})).record;
        goto("/app")
    }

    logout() {
        pb.authStore.clear();
        this.user = null;
        goto("/")
    }
}

// its more safe to wrap user stores in contexts and have the context povide the same 
// user store to everyone who needs it

const AUTH_STORE_KEY = 'auth_store';

export const setAuthContext = (): AuthStore => {
    const newAuthStore = new AuthStore();
    return setContext(AUTH_STORE_KEY, newAuthStore);
}

export const getAuthContext = ():AuthStore => {
    return getContext(AUTH_STORE_KEY);
}

export type {AuthStore};