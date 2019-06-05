import client from '../util/http-client'
import User from '../models/User'

export default {
    namespaced: true,
    state: {
        followees: [],
        followeeCandidates: [],
        followDialog: false
    },
    mutations: {
        setFollowees (state, followees) {
            state.followees = followees
        },
        setFolloweeCandidates (state, followeeCandidates) {
            state.followeeCandidates = followeeCandidates
        },
        openFollowDialog (state) {
            state.followDialog = true
        },
        closeFollowDialog (state) {
            state.followDialog = false
        }
    },
    actions: {
        async fetchFollowees({ state, commit, dispatch, rootState }) {
            const res = await client.get(`/users/${rootState.signInUser.id}/followees`)
            const followees = res.data.map(user => new User(user.id, user.userName))
            commit('setFollowees', followees)
        },
        async fetchFolloweeCandidates({ state, commit, dispatch, rootState }) {
            const res = await client.get(`/users/${rootState.signInUser.id}/followees-candidates`)
            const followeeCandidates = res.data.map(user => new User(user.id, user.userName))
            commit('setFolloweeCandidates', followeeCandidates)
        },
        async follow({ commit, dispatch, rootState }, user) {
            await client.put(`/users/${rootState.signInUser.id}/followees/${user.id}`)
            commit('closeFollowDialog')
            dispatch('fetchFollowees')
        },
        async unfollow({ commit, dispatch, rootState }, userId) {
            await client.delete(`/users/${rootState.signInUser.id}/followees/${userId}`)
            commit('closeFollowDialog')
            dispatch('fetchFollowees')
        }
    }
}