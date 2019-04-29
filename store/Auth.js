const axios = require('axios');
import axiosSettings from '../util/axios-settings'
const client = axios.create(axiosSettings)

export default {
    namespaced: true,
    state: {
      signUpDialog: false,
      email: '',
      password: '',
      userName: ''
    },
    mutations: {
      openSignUpDialog(state) {
        state.signUpDialog = true
      },
      closeSignUpDialog(state) {
        state.signUpDialog = false
      },
      updateEmail(state, email) {
        state.email = email
      },
      updatePassword(state, password) {
        state.password = password
      },
      updateUserName(state, userName) {
        state.userName = userName
      },
    },
    actions: {
        async signUp({ state, commit, dispatch }) {
            const formData = new FormData()
            formData.append('email', state.email)
            formData.append('password', state.password)
            formData.append('userName', state.userName)
            client.post('/users', formData)
            .then(response => {
                if (response.data) {
                    alert('登録完了')
                    dispatch('signIn')
                    commit('closeSignUpDialog')
                    return
                }
                alert('登録失敗')
            })
        },
        async signIn({ state, commit, rootState }) {
            const formData = new FormData()
            formData.append('email', state.email)
            formData.append('password', state.password)
            const response = await client.post('/login', formData)
            if (response.data === "OK") {
              const signInUserResponse = await client.get("/users/sign-in-user")
              rootState.signInUser = signInUserResponse.data
              this.app.router.push('/tasks')
              return;
            }
            if (! response.data.isLogin) {
              if (confirm('登録されてないよ！新規登録する？')) {
                commit('openSignUpDialog')
              }    
            }
        },
    }
}