import { redirect, type Actions } from "@sveltejs/kit"


export const actions = {
    default: async({request, cookies}) => {
        const form = await request.formData();
        const token = form.get("token");

        if (!token || typeof token !== 'string') {
            console.debug(`smth wrong with the token: '${token}'`);
            throw redirect(308, "/auth");
        }

        cookies.set('pb_auth', JSON.stringify({token: token}), {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });
        throw redirect(308, '/app');
    }
} satisfies Actions;