import Vuex from 'vuex'
import Task from './Task'
import Auth from './Auth'
const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        task: Task,
        auth: Auth
    }
})

export default () => store