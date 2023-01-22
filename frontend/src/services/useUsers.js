import httpService from "./httpService.js"
import config from "../config/config.json"

const usersEndpoint = `${config.apiUrl}/users`

function userUrl(id) {
    return `${usersEndpoint}/${id}`

}

function getUsers() {
    return httpService.get(usersEndpoint)
}

function getUserById(id) {
    return httpService.get(userUrl(id))
}

function saveUser(user) {
    if (user._id) {
        const data = {...user}
        delete data._id
        return httpService.put(userUrl(user._id), data)
    }

    return httpService.post(usersEndpoint, user)
}

function deleteUserById(id) {
    return httpService.delete(userUrl(id))
}

export {
    getUsers,
    getUserById,
    saveUser,
    deleteUserById,
    usersEndpoint

}