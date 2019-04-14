import Vuex from 'vuex'
import Task from './Task'

const store = () => new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        task: Task
    }
})

export default store