<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent>
        <v-card v-if="isOpen">
          <v-card-title>
            <span class="headline">新規登録</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="メールアドレス"
              v-model="email"
            ></v-text-field>
            <v-text-field
              label="パスワード"
              :type="'password'"
              v-model="password"
            ></v-text-field>
            <v-text-field
              label="ユーザー名"
              v-model="userName"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click="close()">キャンセル</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="signUp()" right>登録</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapMutations, mapState, mapActions  } from 'vuex'

    export default {
        computed: {
          ...mapState('auth', {
              isOpen: 'signUpDialog'
          }),
          email: {
            get () {
              return this.$store.state.auth.email
            },
            set (email) {
              this.$store.commit('auth/updateEmail', email);
            }
          },
          password: {
            get () {
              return this.$store.state.auth.password
            },
            set (password) {
              this.$store.commit('auth/updatePassword', password);
            }
          },
          userName: {
            get () {
              return this.$store.state.auth.userName
            },
            set (userName) {
              this.$store.commit('auth/updateUserName', userName);
            }
          },
        },
        methods: {
          ...mapActions ('auth', {
            signUp: 'signUp'
          }),
          ...mapMutations('auth', {
              close: 'closeSignUpDialog',
          }),
        },
    }
</script>