<template>
  <v-app light>
      <Header />
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
                    >
                        <v-list-tile-content>
                            <v-list-tile-title v-text="followedUser.name"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn icon ripple @click.stop="unfollow(followedUser.id)">
                            <v-icon color="red lighten-1">delete</v-icon>
                          </v-btn>
                        </v-list-tile-action>
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
import Header from '../../components/Header'
import User from '../../models/User'
import { mapMutations, mapState, mapActions, mapGetters   } from 'vuex'
import FollowDialog from '../../components/dialog/FollowDialog'

export default {
  head: {
    title: 'Friends'
  },
  mounted() {
      this.fetchFollowedUsers()
  },
  methods: {
    ...mapMutations('friend', [
      'openFollowDialog'
    ]),
    ...mapActions ('friend', {
      fetchFollowedUsers: 'fetchFollowedUsers',
      fetchFriendCandidates: 'fetchFriendCandidates',
      unfollow: 'unfollow',
    })
  },
  computed: {
    ...mapState('friend', {
      followedUsers: 'followedUsers',
      friendCandidates: 'friendCandidates'
    })
  },
  components: {
    FollowDialog: FollowDialog,
    Header
  }
}
</script>