<template>
  <v-app light>
      <v-toolbar style="background-color: #47b578" dark app>
          <v-toolbar-title>
              Task List
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat @click="$router.push('/friends')">フレンド</v-btn>
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
                  @click="openTaskDialog(key)"
                >
                  <v-list-tile-avatar>
                    <span v-if="task.isAchieved()" style="font-weight: bold; color: rgb(181, 71, 76)">達成</span>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="task.title"></v-list-tile-title>
                    <template v-if="task.isStepUp()">
                      <v-list-tile-sub-title>{{ task.progress }}/{{ task.amount }}</v-list-tile-sub-title>                      
                    </template>
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
                  @click="openCreationDialog()"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-layout>
      </v-content>
      <CreationDialog></CreationDialog>
      <StepUpDialog></StepUpDialog>
      <AchieveDialog></AchieveDialog>
      
  </v-app>
</template>

<script>
const axios = require('axios');
import { mapMutations, mapState, mapActions, mapGetters   } from 'vuex'
import CreationDialog from '../../components/dialog/TaskCreation.vue'
import StepUpDialog from '../../components/dialog/StepUp.vue'
import AchieveDialog from '../../components/dialog/AchieveDialog.vue'
import axiosSettings from '../../util/axios-settings'
const client = axios.create(axiosSettings)

export default {
  head: {
    title: 'Tasks'
  },
  created: function () {
    this.fetchNowDateTime()
    this.fetchList(this.date)
  },
  methods: {
    ...mapMutations('task', [
      'openCreationDialog',
    ]),
    ...mapActions ('task', {
      fetchList: 'fetchList',
      nextDate: 'fetchNextDateTasks',
      prevDate: 'fetchPrevDateTasks',
      fetchNowDateTime: 'fetchNowDateTime',
      openTaskDialog: 'openTaskDialog',
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
  components: {
      CreationDialog,
      StepUpDialog,
      AchieveDialog
  }
}
</script>