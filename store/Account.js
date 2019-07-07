import client from '../util/http-client'

export default {
    namespaced: true,
    state: {
        user: {
            email: '',
            password: '',
            userName: '',
        }
    },
    mutations: {
        setAccount(state, {email, userName}) {
            state.user.email = email
            state.user.userName = userName
        }
    },
    actions: {
        async updateAccount({ state, commit, dispatch, rootState }, user) {
            console.log("updateAccount")
            console.log(user)
            await client.patch("/users", user)
        },
        async fetchAccount({ commit }) {
            const signInUserResponse = await client.get("/users/me")
            commit(signInUserResponse.data)
        },
    }
}