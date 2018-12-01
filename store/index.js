import Vuex from 'vuex'

const Task = {
    namespaced: true,
    state: {
        creationDialog: false
    },
    mutations: {
        openCreationDialog: function(state) {
            state.creationDialog = true
        },
        closeCreationDialog: function(state) {
            state.creationDialog = false
        },
    },
    actions: {
        create(context, task) {
            console.log(task)
                //ToDo: Ajaxで送信
                // const formData = new FormData();
                // formData.append('title', this.creation.title);
                // formData.append('dueDate', this.creation.dueDate);
                // formData.append('amount', this.creation.amount);
                // await client.post('/tasks', formData)
                // this.initializeCreationForm()
                // this.fetchData()
        }
    },
    getters: {}
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