import httpService from "./httpService.js"
import config from "../config/config.json"

const reasonEndpoint = `${config.apiUrl}/reasons`

function reasonUrl(id) {
    return `${reasonEndpoint}/${id}`
}

function getReasons() {
    return httpService.get(reasonEndpoint)
}

function getReasonById(id) {
    return httpService.get(reasonUrl(id))
}

function saveReason(reason) {
    if (reason._id) {
        const data = {...reason}
        delete data._id
        return httpService.put(reasonUrl(reason._id), data)
    }

    return httpService.post(reasonEndpoint, reason)
}

function deleteReason(id) {
    return httpService.delete(reasonUrl(id))
}

export {
    getReasons,
    getReasonById,
    saveReason,
    deleteReason,
    reasonEndpoint
}
