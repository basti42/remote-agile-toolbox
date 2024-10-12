import { redirect, type Handle } from "@sveltejs/kit";
import PocketBase from 'pocketbase';


export const handle: Handle = async ({event, resolve}) => {
    event.locals.user_id = '';
    event.locals.pb = new PocketBase("http://localhost:8090");

    const isAuth: boolean = event.url.pathname.startsWith('/auth');

    // each route starting with /auth will log the user out
    // and clears the session cookie
    if (isAuth) {
        event.cookies.delete('pb_auth', {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });
        return await resolve(event);
    }

    const pb_auth = event.request.headers.get('cookie') ?? '';
    event.locals.pb.authStore.loadFromCookie(pb_auth);

    if (!event.locals.pb.authStore.isValid) {
        console.log('Session expired');
        throw redirect(303, '/auth/login');
    }

    try {
        const auth = await event.locals.pb
            .collection('users')
            .authRefresh<{id: string, email: string}>();
    
        event.locals.user_id = auth.record.id;
    } catch (err) {
        console.error(err);
        throw redirect(303, '/auth/login')
    }

    if (!event.locals.user_id) {
        throw redirect(303, '/auth/login');
    }

    const response = await resolve(event);
    const cookie = event.locals.pb.authStore.exportToCookie({sameSite: 'lax'});
    response.headers.append('set-cookie', cookie);
    return response;
}