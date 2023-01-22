import httpService from "./httpService.js"
import config from "../config/config.json"

const visitsEndpoint = `${config.apiUrl}/visits`

function visitUrl(id) {
    return `${visitsEndpoint}/${id}`
}

function getVisits(page, limit) {
    return httpService.get(`${visitsEndpoint}/?page_size=${limit}&page_number=${page}`)
}

function searchVisits(search, field) {
    return httpService.get(`${visitsEndpoint}/${search}/${field}`)
}

function searchActiveVisits(search) {

    return httpService.get(`${visitsEndpoint}/search/active/?q=${search}`)

}

function getActiveVisits(page, limit) {
    return httpService.get(`${visitsEndpoint}/active/`)
}
function resumeVisit() {
    return httpService.get(`${config.apiUrl}/home/resume`)
}


function closeVisits(id) {
    return httpService.put(`${visitsEndpoint}/close/${id}`,{})
}

function checkVisit(check){
    return httpService.post( `${config.apiUrl}/check/manual`,check)
}

function getVisitById(id) {
    return httpService.get(visitUrl(id))
}


function deleteVisit(id) {
    return httpService.delete(visitUrl(id))
}

function saveVisit(visit) {
    if (visit._id) {
        const body = {...visit}
        delete body._id
        return httpService.put(visitUrl(visit._id), body)
    }
    return httpService.post(visitsEndpoint, visit)
}

export {
    getVisits,
    getVisitById,
    saveVisit,
    deleteVisit,
    getActiveVisits,
    closeVisits,
    searchVisits,
    searchActiveVisits,
    resumeVisit,
    checkVisit
}