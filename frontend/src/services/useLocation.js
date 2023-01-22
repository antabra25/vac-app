import httpService from "./httpService.js"
import config from "../config/config.json"


const locationEndpoint = `${config.apiUrl}/locations`

function locationUrl(id) {
    return `${locationEndpoint}/${id}`
}

function getLocations() {
    return httpService.get(locationEndpoint)
}

function getLocationById(id) {
    return httpService.get(locationUrl(id))
}

function saveLocation(location) {
    if (location._id) {
        const data = {...location}
        delete data._id
        return httpService.put(locationUrl(location._id), data)
    }

    return httpService.post(locationEndpoint, location)
}


function deleteLocation(id) {
    return httpService.delete(locationUrl(id))
}

export {
    getLocations,
    getLocationById,
    saveLocation,
    deleteLocation,
    locationEndpoint

}