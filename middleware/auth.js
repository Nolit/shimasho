import client from '../util/http-client'

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