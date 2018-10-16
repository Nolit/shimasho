<template>
  <v-app light>
      <v-toolbar style="background-color: #47b578" dark app>
          <v-toolbar-title>Task List</v-toolbar-title>
      </v-toolbar>
      <v-content style="margin-left: auto;margin-right: auto">
          <v-layout mt-5>
            <v-card style="min-width: 400px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <v-btn dark small style="background-color: #47b578" @click="prevDate()">
                  <v-icon dark>arrow_left</v-icon>
                </v-btn>
                <span style="font-size: 18px;">{{ dateFormat }}</span>
                <v-btn dark small style="background-color: #47b578" @click="nextDate()">
                  <v-icon dark>arrow_right</v-icon>
                </v-btn>
              </div>
              <v-toolbar style="background-color: #4682b4" dark>
                <v-toolbar-title style="font-weight: bold;">タスク</v-toolbar-title>
              </v-toolbar>
              <v-list>
                <v-list-tile
                  v-for="task in tasks"
                  :key="task.id"
                  @click="select(task.id)"
                >
                  <v-list-tile-content>
                    <v-list-tile-title v-text="task.title"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-card-text style="height: 100px; position: relative">
                <v-btn
                  absolute
                  dark
                  fab
                  bottom
                  right
                  style="background-color: #b5474c"
                  @click="creationDialog = true"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-layout>
      </v-content>
      <v-footer app>ここはフッターです</v-footer>
      <v-dialog v-model="creationDialog" max-width="500px">
        <v-card>
          <v-card-text>
            <v-flex>
              <v-text-field
                label="タイトル"
                v-model="creation.title"
              ></v-text-field>
              <v-text-field
                label="目標数"
                type="number"
                v-model.number="creation.amount"
              ></v-text-field>
              <v-menu
                ref="dueDateDialog"
                :close-on-content-click="false"
                v-model="dueDateDialog"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="creationDueDateFormatted"
                  label="実施日"
                  persistent-hint
                  prepend-icon="event"
                ></v-text-field>
                <v-date-picker v-model="creation.dueDate" no-title @input="dueDateDialog = false"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-card-text>
          <v-card-actions style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          ">
            <v-btn color="primary" flat @click="creationDialog=false">キャンセル</v-btn>
            <v-btn color="primary" flat @click="create();creationDialog=false" right>作成</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
const axios = require('axios');
import { mapMutations } from 'vuex'
import axiosSettings from '../../util/axios-settings'
import moment from 'moment'
const client = axios.create(axiosSettings)

export default {
  head: {
    title: 'Tasks'
  },
  data: function () {
    return {
      tasks: [],
      date: moment(),
      creationDialog: false,
      creation: null,
      creationDueDateFormatted: null,
      dueDateDialog: false
    }
  },
  created: function () {
    this.initializeCreationForm()
    this.fetchDate()
    this.fetchData()
  },
  methods: {
    initializeCreationForm: function () {
      this.creation = {
        title: '',
        amount: 0,
        dueDate: null
      }
    },
    fetchData: async function () {
      let response = await client.get('/tasks', {
        params: {
          year: this.date.year(),
          month: this.date.month()+1,
          day: this.date.date()
        }
      })
      this.tasks = response.data
    },
    fetchDate: async function () {
      let response = await client.get('/context/time')
      this.date = moment(response.data)
    },
    create: async function () {
      const formData = new FormData();
      formData.append('title', this.creation.title);
      formData.append('dueDate', this.creation.dueDate);
      formData.append('amount', this.creation.amount);
      await client.post('/tasks', formData)
      this.initializeCreationForm()
      this.fetchData()
      
    },
    select: function (id) {
      alert("select: " + id)
    },
    nextDate:function () {
      this.date = moment(this.date).add(1, 'days')
    },
    prevDate:function () {
      this.date = moment(this.date).add(-1, 'days')
    },
    parseDate (date) {
      if (! date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${year}年${month}月${day}日`
    },
  },
  computed: {
    dateFormat: function () {
      return this.date.locale('ja').format('MM月DD日（ddd）')
    }
  },
  watch: {
    date: function (date) {
      this.fetchData()
    },
    'creation.dueDate': function(val){
      this.creationDueDateFormatted = this.formatDate(val)
    }
  }
}
</script>