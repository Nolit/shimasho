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
            </v-card>
          </v-layout>
      </v-content>
      
  </v-app>
</template>

<script>
import User from '../../models/User'
import { mapMutations, mapState, mapActions, mapGetters   } from 'vuex'
import axiosSettings from '../../util/axios-settings'
const axios = require('axios')
const client = axios.create(axiosSettings)

export default {
  head: {
    title: 'Friends'
  },
  created() {
      this.fetchFollowedUsers()
  },
  methods: {
    ...mapMutations('friend', [
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
}
</script>