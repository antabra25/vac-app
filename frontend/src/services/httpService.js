import axios from 'axios';
import auth from './authService'
import {toast} from 'react-toastify';


axios.interceptors.request.use(function (config) {
    const token = auth.getJwt()
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
}, function (error) {
    return Promise.reject(error)
})


axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    toast.error("Error en el servidor")
    toast.error(error.response.data.detail)
    return Promise.reject(error);
});


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}