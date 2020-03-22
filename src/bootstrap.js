import axios from 'axios'

export default function hello() {

    // Add interceptor to setup axios header
    axios.interceptors.request.use(config => {
        const jwt = window.localStorage.getItem('jwt')
        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`
        }
        return config
    }, err => Promise.reject(err))

}
