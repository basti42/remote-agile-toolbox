

export const load = async ({fetch}) => {
    return {
        stories: (await fetch("http://localhost:8082/rat/stories")).json()
    }
}