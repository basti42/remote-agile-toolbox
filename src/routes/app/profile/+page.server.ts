import type { ProfileUpdateRequest } from "$lib/models/profile";


export const actions = {
    updateProfile: async ({request, fetch}) => {
        const data = await request.formData();
        const new_name = data.get("name")?.valueOf() as string | "";
        const new_abbreviation = data.get("abbreviation")?.valueOf() as string | "";
        const new_bio = data.get("bio")?.valueOf() as string | "";
        const new_quote = data.get("quote")?.valueOf() as string | "";
        const profile_uuid = data.get("profile_uuid")?.valueOf() as string

        const profileUpdates = {
            name: new_name, 
            abbreviation: new_abbreviation,
            bio: new_bio, 
            quote: new_quote
        } satisfies ProfileUpdateRequest;

        console.log("profile updates: ", profileUpdates);

        try {
            const response = await fetch(`http://localhost:8083/rat/profiles/${profile_uuid}`, {
                method: "PUT",
                body: JSON.stringify(profileUpdates)
            });
            if (response.status !== 200) {
                console.error(await response.json());
                throw new Error("error response from profile service: " + response.statusText);
            }
            const data = await response.json();
            return {
                success: true,
                updatedProfile: data
            }

        } catch (err) {
            console.error(err);
            return { 
                success: false, 
                updatedProfile: undefined 
            }
        }
    }
}