// import type { Auth } from "$lib/models/auth";
import type { Auth } from '$lib/models/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = pb;

	console.debug('hooks: url: ', event.request.url);
	// console.debug("hooks: event.locals.auth: ", event.locals.auth);

	const isAuthEndpoint = event.url.pathname.startsWith('/auth');
	console.debug("hooks.url is auth endpoint: ", isAuthEndpoint);

	// load the cookie on every request and set the locals
	// but skip all auth endpoints as these are setting and removing cookies
	if (!isAuthEndpoint) {
		try {
			const auth_cookie_string = event.cookies.get('rat-cookie');
			// console.debug("auth cookie string: ", auth_cookie_string);
			const auth: Auth = JSON.parse(auth_cookie_string as string);
			// console.debug("loaded auth object from cookie: ", auth);
			event.locals.auth = auth;
		} catch (err) {
			console.error("\terror loading auth from cookie")
			console.error(err);
			throw redirect(303, '/auth/login');
		}
	}

	// final check that everything is in order
	if (!isAuthEndpoint) {
		if (!event.locals.auth) {
			throw redirect(307, '/auth/login');
		}
	}

	const response = await resolve(event);
	// const cookie = event.locals.pb.authStore.exportToCookie({sameSite: 'lax'});
	// response.headers.append('set-cookie', cookie);
	return response;
};


export const handleFetch = async({request, fetch, event}) => {
	const cookie = event.cookies.get("rat-cookie");
	// console.log("Token from cookie: ", cookie);

	const cookieData = JSON.parse(cookie as string);
	// console.log("cookie Data: ", cookieData);
	
	const accessToken = cookieData.access_token;
	console.log("request url: ", request.url);
	console.log("acces token: ", accessToken);

	request.headers.set("Authorization", `Bearer ${accessToken}`);

	return fetch(request);
}