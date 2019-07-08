<template>
  <v-app light>
      <Header />
      <v-content style="margin-left: auto;margin-right: auto">
          <v-layout mt-5>
            <v-tabs
              color="cyan"
              dark
              slider-color="yellow"
              @change="tabChanged"
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
                  <v-card-text>
                    <v-text-field
                      label="メールアドレス"
                      v-model="accountForm.email"
                    ></v-text-field>
                    <v-text-field
                      label="パスワード"
                      :type="'password'"
                      v-model="accountForm.password"
                    ></v-text-field>
                    <v-text-field
                      label="ユーザー名"
                      v-model="accountForm.userName"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                      <v-btn color="primary" flat @click="initializeAccountForm()">キャンセル</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat @click="updateAccount(accountForm)" right>更新</v-btn>
                  </v-card-actions>
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

const ACCOUT_TAB_INDEX = 0;
const FOLLOWEE_TAB_INDEX = 1;
const FOLLOWER_TAB_INDEX = 2;

export default {
  head: {
    title: 'Account'
  },
  data: function () {
      return {
          accountForm: null,
      }
  },
  created() {
      this.fetchFollowees()
      this.initializeAccountForm()
  },
  methods: {
    initializeAccountForm() {
      this.accountForm = {
        email: this.signInUser.email,
        password: '',
        userName: this.signInUser.userName
      }
    },
    ...mapMutations('friend', [
      'openFollowDialog'
    ]),
    ...mapActions ('friend', {
      fetchFollowees: 'fetchFollowees',
      unfollow: 'unfollow',
    }),
    tabChanged(changedTabIndex) {
      if (changedTabIndex === ACCOUT_TAB_INDEX) {
        this.initializeAccountForm()
      }
    },
    updateAccount(user) {
      this.$store.dispatch('account/updateAccount', user).then(response => {
        this.$toasted.success("更新しました")
      })
    }
  },
  computed: {
    ...mapState('friend', {
      followees: 'followees',
    }),
    ...mapState({
      signInUser: 'signInUser'
    })
  },
  components: {
    FollowDialog: FollowDialog,
    Header,
    Footer
  }
}
</script>