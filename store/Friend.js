const axios = require('axios');
import axiosSettings from '../util/axios-settings'
const client = axios.create(axiosSettings)
import User from '../models/User'

export default {
    namespaced: true,
    state: {
        followedUsers: [],
        followCandidates: [],
    },
    mutations: {
        setFollowedUsers (state, followedUsers) {
            state.followedUsers = followedUsers
        },
        setFollowCandidates (state, followCandidates) {
            state.followCandidates = followCandidates
        }
    },
    actions: {
        async fetchFollowedUsers({ state, commit, dispatch, rootState }) {
            const res = await client.get(`/users/${rootState.signInUser.id}/followed-users`)
            const followedUsers = res.data.map(user => new User(user.id, user.userName))
            commit('setFollowedUsers', followedUsers)
        },
        async fetchFollowCandidates({ state, commit, dispatch }) {
            const json = await client.get(`/users/${1}/friend-candidates`).data
            //ToDo: jsonのデシリアライズ
            //ToDo: Userの配列に変換
            const friendCandidates = [
                new User(1, 'フレンド1'),
                new User(2, 'フレンド2'),
                new User(3, 'フレンド3'),
            ]
            commit('setFollowCandidates', setFollowCandidates)
        },
    }
}