import client from '../util/http-client'
import User from '../models/User'

export default {
    namespaced: true,
    state: {
        followedUsers: [],
        followCandidates: [],
        followDialog: false
    },
    mutations: {
        setFollowedUsers (state, followedUsers) {
            state.followedUsers = followedUsers
        },
        setFollowCandidates (state, followCandidates) {
            state.followCandidates = followCandidates
        },
        openFollowDialog (state) {
            state.followDialog = true
        },
        closeFollowDialog (state) {
            state.followDialog = false
        }
    },
    actions: {
        async fetchFollowedUsers({ state, commit, dispatch, rootState }) {
            const res = await client.get(`/users/${rootState.signInUser.id}/followed-users`)
            const followedUsers = res.data.map(user => new User(user.id, user.userName))
            commit('setFollowedUsers', followedUsers)
        },
        async fetchFollowCandidates({ state, commit, dispatch, rootState }) {
            const res = await client.get(`/users/${rootState.signInUser.id}/friend-candidates`)
            const followCandidates = res.data.map(user => new User(user.id, user.userName))
            commit('setFollowCandidates', followCandidates)
        },
        async follow({ commit, dispatch, rootState }, user) {
            await client.put(`/users/${rootState.signInUser.id}/followed-users/${user.id}`)
            commit('closeFollowDialog')
            dispatch('fetchFollowedUsers')
        },
        async unfollow({ commit, dispatch, rootState }, userId) {
            await client.delete(`/users/${rootState.signInUser.id}/followed-users/${userId}`)
            commit('closeFollowDialog')
            dispatch('fetchFollowedUsers')
        }
    }
}