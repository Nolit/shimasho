import Timeline from '../models/timeline/Timeline'
import User from '../models/timeline/User'
import client from '../util/http-client'

export default {
    namespaced: true,
    state: {
        list: [],
    },
    mutations: {
        setList(state, list) {
            state.list = list
        }
    },
    actions: {
        async fetchList({ commit, rootState }) {
            const response = await client.get(`/users/${rootState.signInUser.id}/timelines`)
            const responseData = response.data
            const users = responseData.map(user => {
                const timelines = user.timelines.map(timeline => {
                    return new Timeline(timeline.id, timeline.message, timeline.createdAt)
                })
                return new User(user.id, user.userName, timelines)
            })
            commit('setList', users)
        },
    }
}