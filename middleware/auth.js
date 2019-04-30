const axios = require('axios');
import axiosSettings from '../util/axios-settings'
const client = axios.create(axiosSettings)

export default async function ({store, redirect, route, commit}) {
    if (route.path === '/') {
        return
    }
    if (store.state.signInUser !== null) {
        return
    }
    
    const signInUserResponse = await client.get("/users/sign-in-user")
    if (signInUserResponse.data) {
        store.state.signInUser = signInUserResponse.data
        return
    }
    return redirect('/')
}