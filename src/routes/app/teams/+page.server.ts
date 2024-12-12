
export const load = async ({fetch}) => {

    return {
        teams: await (await fetch("http://localhost:8083/rat/teams")).json()
    }

}