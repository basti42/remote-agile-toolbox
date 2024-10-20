import type { Auth } from '$lib/models/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from '../../app/stories/$types';

export const load = async (event: PageServerLoadEvent) => {
	// console.log("login server load")
	// console.log(event);
	console.debug('login.server: handling request: ', event.request.url);

	// console.debug(`---> received call to = '${event.url}'`);
	const token_id = event.url.searchParams.get('token_id');
	const exchange_code = event.url.searchParams.get('exc');

	if (
		token_id !== null &&
		typeof token_id === 'string' &&
		exchange_code !== null &&
		typeof exchange_code === 'string'
	) {
		console.debug('\ttoken id = ', token_id);
		console.debug('\texchange code = ', exchange_code);
		console.debug('\t----requesting new access token-----');

		const response = await fetch(
			`http://localhost:8081/oauth/exchange/${token_id}?exc=${exchange_code}`
		);
		const data = await response.json();
		console.debug('token exchange response: ');

		if (!response.ok) {
			// TODO handle error cases
			console.error(`error from token exchange route: ${data.error}`);
		} else {
			// TODO handle setting access token cookie
			console.debug(data);

			event.cookies.set('rat-cookie', JSON.stringify(data), {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'lax'
			});
			event.locals.auth = data as Auth;

			console.debug('login.server: set auth data to event.locals.auth');
			// console.debug("set locals auth = ", event.locals.auth);

			throw redirect(307, '/app');
		}
	}
};

// export const actions = {
//     default: async({request}) => {
//         const form = await request.formData();
//         const token = form.get("token");

//         if (!token || typeof token !== 'string') {
//             console.debug(`smth wrong with the token: '${token}'`);
//             throw redirect(308, "/auth");
//         }
//         throw redirect(308, '/app');
//     }
// } satisfies Actions;
