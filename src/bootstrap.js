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

    // Add interceptor to redirect when non authorized
    axios.interceptors.response.use(undefined, error => {
        if(error.response.status === 401) {
            window.location.href = 'http://localhost:3000/login'; // TODO use ENV
        }
        return Promise.reject(error);
      });

      // Handle spotify sdk init
      window.onSpotifyWebPlaybackSDKReady = () => {}
}
