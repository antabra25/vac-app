import httpService from "./httpService.js"
import config from "../config/config.json"

const visitorsEndpoint = `${config.apiUrl}/visitors`

function visitorUrl(id) {
    return `${visitorsEndpoint}/${id}`

}

function getVisitors() {
    return httpService.get(visitorsEndpoint)
}

function getVisitorById(id) {
    return httpService.get(visitorUrl(id))
}


function verifyPhone() {

    return httpService.get(`${visitorsEndpoint}/verify/`)
}

export {
    getVisitors,
    getVisitorById,
    verifyPhone,
    visitorsEndpoint
}