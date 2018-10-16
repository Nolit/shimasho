<template>
  <v-app light>
    <v-toolbar color="green darken-2" dark app>
      <v-toolbar-title>My Account</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-layout mt-5>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title>
              <h1>本日のタスク</h1>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-tile
                  v-for="(task, key) in todos"
                  :key="key"
                  avatar
                >
                  <v-list-tile-content>
                    <v-list-tile-title v-text="task.title"></v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-avatar>
                    <v-btn icon @click="clickTask(key)">
                      <v-icon>forward</v-icon>
                    </v-btn>
                    <v-btn icon @click="remove(key)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-list-tile-avatar>
                </v-list-tile>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon color="pink lighten" @click="showDialog()">
                <v-icon color="white">add</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
    <v-footer app>ここはフッターです</v-footer>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Create
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Title"
            single-line
            v-model="title"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false;create()"
          >
            create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);
import { mapMutations, mapState } from 'vuex'
import firebase from 'firebase'
var db = firebase.database()
var todosRef = db.ref('todos-99d88')
mock.onPost('/join').reply(200, {
  isLogin: true
});

mock.onPost('/signup').reply(200, {
  isSuccess: true
});

export default {
  head: {
    title: 'My Account'
  },
  data: function () {
    return {
      dialog: false,
      title: ''
    }
  },
  methods: {
    create: function () {
      this.add(this.title)
    },
    add: function (title) {
      this.$store.dispatch('addToDo', {title: title, type: 'normal'})
    },
    clickTask: function (key) {
      location.href = `/tasks/${key}`
    },
    remove: function (key) {
      this.$store.dispatch('removeToDo', key)
    },
    showDialog: function () {
      this.title = ''
      this.dialog = true
    }
  },
  computed: {
    ...mapState([
      'todos'
    ])
  },
  created: function () {
    this.$store.dispatch('setTodosRef', todosRef)
  }
}
</script>