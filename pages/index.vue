<template>
    <v-app light>
      <Header />
      <v-content style="margin: 20px 20px">
        <v-layout mt-1>
          <v-flex sm6 offset-sm3>
            <v-card>
              <v-card-title primary-title>
                <h1>Join</h1>
              </v-card-title>
              <v-card-text>
                <v-form v-model="formValid">
                  <v-text-field
                    v-model="email"
                    label="メールアドレス"
                    required
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="パスワード"
                    required
                    :type="'password'"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="green" @click="signIn()" :disabled="!formValid">Join</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-content>
      <SignUpDialog />
  </v-app>
  
</template>

<script>
import SignUpDialog from '../components/dialog/SignUpDialog'
import { mapMutations, mapActions } from 'vuex'
import Header from '../components/Header'
export default {
  data: function () {
    return {
      emailRules: [
        v => !!v || 'メールアドレスを入力してください',
        v => /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || 'メールアドレスの形式で入力してください'
      ],
      passwordRules: [
        v => !!v || 'パスワードを入力してください',
        v => v.length >= 8 || '8文字以上入力してください'
      ],
      formValid: true,
    }
  },
  methods: {
    ...mapActions('auth', [
      'signIn'
    ]),
  },
  computed: {
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
  },
  components: {
    SignUpDialog: SignUpDialog,
    Header
  }
}
</script>
