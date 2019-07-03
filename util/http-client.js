import Axios from 'axios'

const http = Axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'http://13.231.183.13',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
})

export default http