import httpService from "httpService.js"
import config from "../config/config.json"


const devicesEndpoint = `${config.apiUrl}/devices`

function deviceUrl(id) {
    return `${devicesEndpoint}/${id}`
}

function getDevices() {
    return httpService.get(devicesEndpoint)
}

function getDeviceById(id) {
    return httpService.get(deviceUrl(id))
}

function saveDevice(device) {
    if (device.device_id) {
        const data = {...device}
        delete data._id
        return httpService.put(deviceUrl(device.device_id), data)
    }

    return httpService.post(devicesEndpoint, device)
}

function deleteDeviceById(id) {
    return httpService.delete(deviceUrl(id))
}

export {
    getDevices,
    getDeviceById,
    saveDevice,
    deleteDeviceById,
    devicesEndpoint
}