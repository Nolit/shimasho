import client from '../util/http-client'
import Vue from 'vue'

export default async function ({store, redirect, route, commit}) {
    if (route.path === '/') {
        return
    }
    
    try {
        const response = await client.get("/users/sign-in-user")
        if (response.data) {
            store.state.signInUser = signInUserResponse.data
            return
        }
    } catch (error) {
        console.log(error)
    }
    return redirect('/')
}