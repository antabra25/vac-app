import httpService from "./httpService.js"
import config from "../config/config.json"
import {rolesEndpoint} from "./useRole.js";


const reportEndpoint = `${config.apiUrl}/report`


function createReport(report) {
    return httpService.post(`${reportEndpoint}/`, report)
}


export {
    createReport
}


