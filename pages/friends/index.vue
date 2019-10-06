<template>
  <v-app light>
      <Header />
      <v-content style="margin: 20px 20px">
          <v-layout mt-1>
            <v-flex sm6 offset-sm3>
              <v-tabs
                background-color="#4682b4"
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
                        :readonly="isShow"
                        v-model="accountForm.email"
                      ></v-text-field>
                      <v-text-field
                        label="パスワード"
                        :type="'password'"
                        v-model="accountForm.password"
                        :readonly="isShow"
                        autocomplete="nope"
                      ></v-text-field>
                      <v-text-field
                        label="ユーザー名"
                        v-model="accountForm.userName"
                        :readonly="isShow"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn v-show="! isShow" color="primary" text @click="initializeAccountForm(); isShow = true">キャンセル</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn v-show="isShow" color="primary" text @click="isShow = false" right>編集</v-btn>
                        <v-btn v-show="! isShow" color="primary" text @click="updateAccount(accountForm); isShow = true" right>更新</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-list style="max-height: 350px" class="scroll-y">
                      <v-list-item
                          v-for="followee in followees"
                          :key="followee.id"
                      >
                          <v-list-item-content>
                              <v-list-item-title v-text="followee.name"></v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn icon ripple @click.stop="unfollow(followee.id)">
                              <v-icon color="red lighten-1">delete</v-icon>
                            </v-btn>
                          </v-list-item-action>
                      </v-list-item>
                    </v-list>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn text color="blue" @click="openFollowDialog()" style="font-weight: bold">Add</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>ここにフォロワーリスト</v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-flex>
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
  data: function () {
      return {
          accountForm: null,
          isShow: true
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