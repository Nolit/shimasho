import Vuex from 'vuex'
import Task from './Task'
import Auth from './Auth'
import Friend from './Friend'
const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        task: Task,
        auth: Auth,
        friend: Friend
    }
})

export default () => store