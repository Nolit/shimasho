<template>
    <v-app light>
      <v-toolbar color="green darken-2" dark app>
        <v-toolbar-title>JOIN</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-layout mt-5>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-card-title primary-title>
                <h1>Signin & Signup</h1>
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="form.email"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.password"
                    label="Password"
                    required
                    :type="'password'"
                    :rules="passwordRule"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="green" @click="submit()">Join</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-content>
    <v-footer app>ここはフッターです</v-footer>
  </v-app>
  
</template>

<script>
const axios = require('axios');
import { mapMutations } from 'vuex'
import axiosSettings from '../util/axios-settings'
const client = axios.create(axiosSettings)

export default {
  head: {
    title: 'Tasks'
  },
  data: function () {
    return {
      form: {
        email: 'aaaa@gmail.com',
        password: 'aaaaaaaa',
      },
      passwordRule: [v => v.length >= 8 || 'Min 8 characters']
    }
  },
  methods: {
    submit: async function () {
      this.signin(this.form.email, this.form.password)
    },
    signin: async function (email, password) {
      let response = await client.post('/login', this.form, {
          transformRequest: [function(data) {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('password', data.password);
            return formData;
          }]
        })
      if (response.data === "OK") {
        this.paginateTaskList()
        return;
      }
      if (! response.data.isLogin) {
        if (confirm('ユーザ情報が存在しません。新規登録しますか？')) {
          this.signup(email, password)
        }    
      }
    },
    signup: async function (email, password) {
      const formData = new FormData();
      formData.append('email', this.form.email);
      formData.append('password', this.form.password);
      client.post('/users', formData)
      .then(response => {
          if (response.data) {
            alert('success Singup')
            this.signin(email, password)
            return;
          }
          alert('failed Signup')
      })
    },
    paginateTaskList: function () {
      this.$router.push('/tasks')
    }
  },
  computed: {
    email: {
      get () {
        return this.$store.state.email
      },
      set (email) {
        this.$store.commit('email', email);
      }
    }
  }
}
</script>
