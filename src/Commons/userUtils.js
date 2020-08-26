export const setUserStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
}

export const getUserStorage = () => {
    return JSON.parse(localStorage.getItem("user"))
}
