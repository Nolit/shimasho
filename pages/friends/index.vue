<template>
  <v-app light>
      <Header />
      <v-content style="margin-left: auto;margin-right: auto">
          <v-layout mt-5>
            <v-tabs
              v-model="active"
              color="cyan"
              dark
              slider-color="yellow"
            >
              <v-tab ripple>
                  会員情報
              </v-tab>
              <v-tab ripple>
                  フォローリスト
              </v-tab>
              <v-tab ripple>
                  フォロワーリスト
              </v-tab>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>ここに会員情報</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-list>
                    <v-list-tile
                        v-for="followee in followees"
                        :key="followee.id"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title v-text="followee.name"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn icon ripple @click.stop="unfollow(followee.id)">
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
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>ここにフォロワーリスト</v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-layout>
      </v-content>
      <FollowDialog></FollowDialog>
      <Footer></Footer>
  </v-app>
</template>

<script>
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import User from '../../models/User'
import { mapMutations, mapState, mapActions, mapGetters   } from 'vuex'
import FollowDialog from '../../components/dialog/FollowDialog'

export default {
  head: {
    title: 'Friends'
  },
  mounted() {
      this.fetchFollowees()
  },
  methods: {
    ...mapMutations('friend', [
      'openFollowDialog'
    ]),
    ...mapActions ('friend', {
      fetchFollowees: 'fetchFollowees',
      unfollow: 'unfollow',
    })
  },
  computed: {
    ...mapState('friend', {
      followees: 'followees'
    })
  },
  components: {
    FollowDialog: FollowDialog,
    Header,
    Footer
  }
}
</script>