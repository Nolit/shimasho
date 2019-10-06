import Axios from 'axios'
import Vue from 'vue'

const http = Axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'http://13.231.183.13',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
})

http.interceptors.response.use(function (response) {
    return response
}, function (error) {
    console.log(error.response)
    console.log(error.response.data)
    error.response.data.errors.forEach(error => {
        console.log("トースト出すよ")
        Vue.toasted.error(error.message)        
    })
    throw new Error();
})

export default http