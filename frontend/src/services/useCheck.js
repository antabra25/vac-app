import httpService from "./httpService.js";
import config from "../config/config.json"


const checkEndpoint = `${config.apiUrl}/check`


function saveCheck(check) {
    return httpService.post(`${checkEndpoint}/`, check)
}


export {
    saveCheck
}


