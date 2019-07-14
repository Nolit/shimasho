<template>
  <v-app light>
      <Header />
      <v-content style="margin: 20px 20px">
          <v-layout row wrap mt-1>
            <v-flex v-for="user in users" :key="user.id">
                <v-card>
                <h2>{{ user.name }}</h2>
                <v-list>
                    <v-list-tile
                    v-for="timeline in user.timelines"
                    :key="timeline.id"
                    >
                    <v-list-tile-content>
                        <v-list-tile-title>({{timeline.time}})&nbsp;&nbsp;&nbsp;{{ timeline.message }}</v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                </v-card>
            </v-flex>
          </v-layout>
      </v-content>
      <Footer></Footer>
  </v-app>
</template>

<script>
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { mapMutations, mapState, mapActions, mapGetters   } from 'vuex'

export default {
  mounted: function () {
    this.fetchList()
  },
  methods: {
    ...mapMutations('timeline', [
    ]),
    ...mapActions ('timeline', {
      fetchList: 'fetchList',
    })
  },
  computed: {
    ...mapState('timeline', {
      users: 'list',
    })
  },
  components: {
      Header,
      Footer
  }
}
</script>