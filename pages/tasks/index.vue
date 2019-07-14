<template>
  <v-app v-touch="{ right: () => prevDate(), left: () => nextDate() }" light>
      <Header />
      <v-content style="margin: 20px 20px">
          <v-layout>
            <v-flex sm6 offset-sm3>
              <v-card>
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
                <v-list style="max-height: 350px" class="scroll-y">
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
                    <v-list-tile-action>
                      <v-btn icon ripple @click.stop="remove(task.id)">
                        <v-icon color="red lighten-1">delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <v-card-actions>
                  <v-spacer />
                  <v-btn flat color="blue" @click="openCreationDialog()" style="font-weight: bold">Add</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
      </v-content>
      <CreationDialog></CreationDialog>
      <StepUpDialog></StepUpDialog>
      <AchieveDialog></AchieveDialog>
      <Footer></Footer>
  </v-app>
</template>

<style>
  .v-btn {
    min-width: 0;
  }
</style>

<script>
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { mapMutations, mapState, mapActions, mapGetters   } from 'vuex'
import CreationDialog from '../../components/dialog/TaskCreation.vue'
import StepUpDialog from '../../components/dialog/StepUp.vue'
import AchieveDialog from '../../components/dialog/AchieveDialog.vue'

export default {
  mounted: function () {
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
      openTaskDialog: 'openTaskDialog'
    }),
    remove(id) {
      this.$store.dispatch('task/remove', id).then(response => {
        this.$toasted.success("削除しました")
      })
    }
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
      AchieveDialog,
      Header,
      Footer
  }
}
</script>
