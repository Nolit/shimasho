<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent>
        <v-card v-if="isOpen">
          <v-card-title>
            <span class="headline">新規登録</span>
          </v-card-title>
          <v-form v-model="formValid">
            <v-card-text>
              <v-text-field
                label="メールアドレス"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                label="パスワード"
                :type="'password'"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
              <v-text-field
                label="ユーザー名"
                v-model="userName"
                :rules="userNameRules"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text @click="close()">キャンセル</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="signUp()" :disabled="!formValid" right>登録</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapMutations, mapState, mapActions  } from 'vuex'

    export default {
        data() {
          return {
            emailRules: [
              v => !!v || 'メールアドレスを入力してください',
              v => /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || 'メールアドレスの形式で入力してください'
            ],
            passwordRules: [
              v => !!v || 'パスワードを入力してください',
              v => v.length >= 8 || '8文字以上入力してください'
            ],
            userNameRules: [
              v => !!v || 'ユーザ名を入力してください',
            ],
            formValid: true,
          }
        },
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