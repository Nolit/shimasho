<template>
  <v-app light>
      <v-toolbar style="background-color: #47b578" dark app>
          <v-toolbar-title>
              Task List
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat @click="$router.push('/')">ログアウト</v-btn>
          </v-toolbar-items>
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
                  v-for="(task, key) in tasks"
                  :key="task.id"
                  @click="select(key)"
                >
                  <v-list-tile-content>
                    <v-list-tile-title v-text="task.title"></v-list-tile-title>
                    <v-list-tile-sub-title>{{ task.progress }}/{{ task.amount }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-avatar v-if="task.progress >= task.amount">
                    <span style="font-weight: bold; color: rgb(181, 71, 76)">達成</span>
                  </v-list-tile-avatar>
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
                  @click="openCreationDialog()"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-layout>
      </v-content>
      <CreationDialog></CreationDialog>
      <v-dialog v-model="progressDialog" max-width="500px">
        <v-card v-if="progressDialog">
          <v-card-title>
            <span class="headline">{{ tasks[editTaskKey].title}}</span>
            【{{ tasks[editTaskKey].progress}} / {{ tasks[editTaskKey].amount}}】
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="進捗数"
              type="number"
              v-model.number="addProgressCount"
            ></v-text-field>
            <div style="text-align: right">
            <v-btn
              dark
              fab
              top
              right
              style="background-color: #b5474c"
              @click="progress()"
            >
                進捗！
            </v-btn>
            </div>
          </v-card-text>

        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
const axios = require('axios');
import { mapMutations } from 'vuex'
import CreationDialog from '../../components/dialog/TaskCreation.vue'
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
      progressDialog: false,
      editTaskKey: null,
      addProgressCount: 0
      
    }
  },
  created: function () {
    this.fetchDate()
    this.fetchData()
  },
  methods: {
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
    select: function (key) {
      this.editTaskKey = key
    },
    progress: async function () {
      const id = this.tasks[this.editTaskKey].id
      const addCount = this.addProgressCount
      await client.patch(`/tasks/${id}/progress/${addCount}`)
      this.progressDialog = false
      this.fetchData()
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
    ...mapMutations('task', [      
      'openCreationDialog'
    ])
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
    progressDialog: function (isOpen) {
      if (! isOpen) {
        this.editTaskKey = null
        this.addProgressCount = 0
      }
    },
    editTaskKey: function (key) {
      if (key !== null) {
        this.progressDialog = true
      }
    }
  },
  components: {
      CreationDialog
  }
}
</script>