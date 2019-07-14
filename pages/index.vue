<template>
    <v-app light>
      <Header />
      <v-content>
        <v-layout mt-5>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-card-title primary-title>
                <h1>Join</h1>
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    required
                    :type="'password'"
                    :rules="passwordRule"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="green" @click="signIn()">Join</v-btn>
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
      passwordRule: [v => v.length >= 8 || 'Min 8 characters']
    }
  },
  methods: {
    ...mapActions('auth', [
      'signIn'
    ])
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
