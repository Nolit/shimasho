<template>
    <v-footer height="auto">
        <v-bottom-nav
            :active="navigation"
            :color="color"
            :value="true"
            dark
            fixed
        >
            <v-btn @click="$router.push('/tasks')" dark>
                <span>Task</span>
                <v-icon>list</v-icon>
            </v-btn>

            <v-btn @click="$router.push('/timelines')" dark>
                <span>Timeline</span>
                <v-icon>timelines</v-icon>
            </v-btn>

            <v-btn @click="$router.push('/friends')" dark>
                <span>Friend</span>
                <v-icon>group</v-icon>
            </v-btn>
        </v-bottom-nav>
    </v-footer>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters   } from 'vuex'
export default {
    created() {
        const route = this.$router.currentRoute.name
        if (route === 'tasks') {
           this.navigation = 0
        }
        if (route === 'timelines') {
           this.navigation = 1
        }
        if (route === 'friends') {
           this.navigation = 2
        }
    },
    data () {
        return {
            navigation: null
        }
    },
    computed: {
        color () {
            switch (this.navigation) {
                case 0: return 'blue-grey'
                case 1: return 'teal'
                case 2: return 'brown'
                case 3: return 'indigo'
            }
        }
    }
}
</script>