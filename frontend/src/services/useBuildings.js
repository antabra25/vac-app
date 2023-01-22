import httpService from "./httpService.js";
import config from "../config/config.json"

const buildingsEndpoint = `${config.apiUrl}/buildings`

function buildingUrl(id) {
    return `${buildingsEndpoint}/${id}`

}

function getBuildings() {
    return httpService.get(buildingsEndpoint)
}

function getBuildingById(id) {
    return httpService.get(buildingUrl(id))
}

function saveBuilding(building) {
    if (building._id) {
        const data = {...building}
        delete data._id
        return httpService.put(buildingUrl(building._id), data)
    }

    return httpService.post(buildingsEndpoint, building)
}

function deleteBuilding(id) {
    return httpService.delete(buildingUrl(id))
}

export {
    getBuildings,
    getBuildingById,
    saveBuilding,
    deleteBuilding,
    buildingsEndpoint
}
