<template>
  <v-app light>
      <v-toolbar style="background-color: #47b578" dark app>
          <v-toolbar-title>
              Friend List
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat @click="$router.push('/tasks')">タスク</v-btn>
            <v-btn flat @click="$router.push('/')">ログアウト</v-btn>
          </v-toolbar-items>
      </v-toolbar>
      <v-content style="margin-left: auto;margin-right: auto">
          <v-layout mt-5>
            <v-card style="min-width: 400px;">
                <v-toolbar style="background-color: #4682b4" dark>
                    <v-toolbar-title style="font-weight: bold;">友達</v-toolbar-title>
                </v-toolbar>
                <v-list>
                    <v-list-tile
                        v-for="(followedUser) in followedUsers"
                        :key="followedUser.id"
                        @click="openTaskDialog(key)"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title v-text="followedUser.name"></v-list-tile-title>
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
                    @click="openFollowDialog()"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-card-text>
            </v-card>
          </v-layout>
      </v-content>
      <FollowDialog></FollowDialog>
  </v-app>
</template>

<script>
import User from '../../models/User'
import { mapMutations, mapState, mapActions, mapGetters   } from 'vuex'
import axiosSettings from '../../util/axios-settings'
const axios = require('axios')
const client = axios.create(axiosSettings)
import FollowDialog from '../../components/dialog/FollowDialog'

export default {
  head: {
    title: 'Friends'
  },
  created() {
      this.fetchFollowedUsers()
  },
  methods: {
    ...mapMutations('friend', [
      'openFollowDialog'
    ]),
    ...mapActions ('friend', {
      fetchFollowedUsers: 'fetchFollowedUsers',
      fetchFriendCandidates: 'fetchFriendCandidates',
    })
  },
  computed: {
    ...mapState('friend', {
      followedUsers: 'followedUsers',
      friendCandidates: 'friendCandidates'
    })
  },
  components: {
    FollowDialog: FollowDialog
  }
}
</script>