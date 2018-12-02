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
                <span style="font-size: 18px;">{{ dateFormatted }}</span>
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
import { mapMutations, mapState, mapActions, mapGetters   } from 'vuex'
import CreationDialog from '../../components/dialog/TaskCreation.vue'
import axiosSettings from '../../util/axios-settings'
const client = axios.create(axiosSettings)

export default {
  head: {
    title: 'Tasks'
  },
  data: function () {
    return {
      progressDialog: false,
      editTaskKey: null,
      addProgressCount: 0
    }
  },
  created: function () {
    console.log(this.date)
    this.fetchNowDateTime()
    this.fetchList(this.date)
  },
  methods: {
    select: function (key) {
      this.editTaskKey = key
    },
    progress: async function () {
      const id = this.tasks[this.editTaskKey].id
      const addCount = this.addProgressCount
      await client.patch(`/tasks/${id}/progress/${addCount}`)
      this.progressDialog = false
      this.fetchList(this.date)
    },
    ...mapMutations('task', [      
      'openCreationDialog'
    ]),
    ...mapActions ('task', {
      fetchList: 'fetchList',
      nextDate: 'fetchNextDateTasks',
      prevDate: 'fetchPrevDateTasks',
      fetchNowDateTime: 'fetchNowDateTime',
    })
  },
  computed: {
    ...mapState('task', {
      tasks: 'list',
      date: 'date'
    }),
    ...mapGetters('task', [
        'dateFormatted'      
    ])
  },
  watch: {
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