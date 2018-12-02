import Vuex from 'vuex'
const axios = require('axios');
import axiosSettings from '../util/axios-settings'
import moment from 'moment'
const client = axios.create(axiosSettings)
const Task = {
    namespaced: true,
    state: {
        creationDialog: false,
        list: [],
        date: moment(),
        date_tmp: moment(),
    },
    mutations: {
        openCreationDialog(state) {
            state.creationDialog = true
        },
        closeCreationDialog(state) {
            state.creationDialog = false
        },
        setList(state, list) {
            state.list = list
        },
        setDate(state, date) {
            state.date = date
        }
    },
    actions: {
        async create({ state }, task) {
            const formData = new FormData()
            formData.append('title', task.title)
            formData.append('dueDate', task.dueDate)
            formData.append('amount', task.amount)
            await client.post('/tasks', formData)
            context.dispatch('fetchList', state.date)
        },
        async fetchList({ commit }, date) {
            let response = await client.get('/tasks', {
                params: {
                    year: date.year(),
                    month: date.month() + 1,
                    day: date.date()
                }
            })
            commit('setList', response.data)
        },
        async fetchNowDateTime({ state, commit }) {
            const date = await client.get('/context/time').data
            commit('setDate', moment(response.data))
        },
        fetchNextDateTasks({ state, commit, dispatch }) {
            const date = state.date.add(1, 'days')
            commit('setDate', date)
            dispatch('fetchList', date)
        },
        fetchPrevDateTasks({ state, commit, dispatch }) {
            const date = state.date.add(-1, 'days')
            commit('setDate', date)
            dispatch('fetchList', date)
        },
    },
    getters: {
        dateFormatted: state => {
            console.log(typeof state.date)
            return 'Formatted Date'
            return state.date.locale('ja').format('MM月DD日（ddd）')
        }
    }
}

const store = () => new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        task: Task
    }
})

export default store