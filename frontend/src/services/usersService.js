import axios from "axios"
import httpService  from "./httpService.js";
import config from "../config/config.json"

function login(username, password) {
    const payload = new FormData()
    payload.append("username", username)
    payload.append("password", password)
    const customConfig = {
        baseURL: 'http://127.0.0.1:8000',
        timeout: 1000,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    let request = axios.create(customConfig)

    return request.post('/login', payload)
}

function updateLocation(location){

    return httpService.put(`${config.apiUrl}/users/location`,location)

}


export {
    login,
    updateLocation
}
