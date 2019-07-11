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
            const id = rootState.signInUser.id
            const response = await client.patch(`/users/${id}`, user)
            rootState.signInUser = response.data
        },
    }
}