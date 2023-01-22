import httpService from "./httpService.js"
import config from "../config/config.json"

const rolesEndpoint = `${config.apiUrl}/roles`

function roleUrl() {
    return `${rolesEndpoint}/${id}`
}

function getRoles() {
    return httpService.get(rolesEndpoint)
}

function getRoleById(id) {
    return httpService.get(roleUrl(id))
}

export {
    getRoleById,
    getRoles,
    rolesEndpoint
}
