import httpService from "httpService.js"
import config from "../config/config.json"


const carsEndpoint = `${config.apiUrl}/cars`

function carUrl(id) {
    return `${carsEndpoint}/${id}`

}

function getCars() {
    return httpService.get(carsEndpoint)
}

function getCarById(id) {
    return httpService.get(carUrl(id))
}

function saveCar(car) {
    if (car._id) {
        const data = {...car}
        delete data._id
        return httpService.put(carUrl(car._id), data)
    }

    return httpService.post(carsEndpoint, car)
}

function deleteCarById(id) {
    return httpService.delete(carUrl(id))
}

export {
    getCars,
    getCarById,
    saveCar,
    deleteCarById,
    carsEndpoint

}