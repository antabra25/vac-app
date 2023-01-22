import httpService from "./httpService.js"
import config from "../config/config.json"


const passesEndpoint = `${config.apiUrl}/pass`

function passUrl(id) {
    return `${passesEndpoint}/${id}`
}

function getPasses(page, limit) {
    return httpService.get(`${passesEndpoint}/?page_size=${limit}&page_number=${page}`)
}

function getPassById(id) {
    return httpService.get(`${passesEndpoint}/${id}`)
}

function savePass(pass) {
    return httpService.post(passesEndpoint, pass)

}

function deletePass(id) {

    return httpService.delete(passUrl(id))
}


function searchPasses(search) {
    return httpService.get(`${passesEndpoint}/search/?q=${search}`)
}

export {
    getPasses,
    savePass,
    deletePass,
    searchPasses,
    getPassById,
    passesEndpoint
}





