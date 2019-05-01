import client from '../util/http-client'
import Vue from 'vue'

export default async function ({store, redirect, route, commit}) {
    if (route.path === '/') {
        return
    }
    
    try {
        const response = await client.get("/users/sign-in-user")
        if (response.data) {
            store.state.signInUser = response.data
            return
        }
    } catch (error) {
        Vue.toasted.error(error.response.data.message)
    }
    return redirect('/')
}