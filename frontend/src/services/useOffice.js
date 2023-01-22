import httpService from "./httpService.js"
import config from "../config/config.json"

const officesEndpoint = `${config.apiUrl}/offices`

function officeUrl(id) {
    return `${officesEndpoint}/${id}`

}

function getOffices() {
    return httpService.get(officesEndpoint)
}

function getOfficeById(id) {
    return httpService.get(officeUrl(id))
}

function getOfficeByBuildingId(name) {
    return httpService.get(`${officesEndpoint}/building/${name}`)
}

function saveOffice(office) {
    if (office._id) {
        const data = {...office}
        delete data._id
        return httpService.put(officeUrl(office._id), data)
    }

    return httpService.post(officesEndpoint, office)
}

function deleteOfficeById(id) {
    return httpService.delete(officeUrl(id))
}

export {
    getOffices,
    getOfficeById,
    saveOffice,
    deleteOfficeById,
    getOfficeByBuildingId,
    officesEndpoint
}