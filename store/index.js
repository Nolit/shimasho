import Vuex from 'vuex'
const myPlugin = store => store.dispatch('initToDo', 'test');



const store = () => new Vuex.Store({
    state: {
        todos: {}
    },
    mutations: {},
    actions: {},
})

export default store