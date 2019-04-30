import Vuex from 'vuex'
import Task from './Task'
import Auth from './Auth'
import Friend from './Friend'
import Timeline from './Timeline'
const store = new Vuex.Store({
    state: {
        signInUser: null
    },
    mutations: {},
    actions: {},
    modules: {
        task: Task,
        auth: Auth,
        friend: Friend,
        timeline: Timeline
    }
})

export default () => store