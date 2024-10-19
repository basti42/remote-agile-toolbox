

export const load = async(event) => {
    event.cookies.delete("rat-cookie", {path: "/"});
}