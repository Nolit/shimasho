<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent>
        <v-card v-if="isOpen">
          <v-card-title>
            <span class="headline">{{ task.title}}</span>
          </v-card-title>
          <v-card-text>
            <div style="text-align: right">
                <v-btn
                dark
                style="background-color: #b5474c"
                @click="achieve()"
                >
                    達成
                </v-btn>
            </div>
          </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapMutations, mapState, mapActions  } from 'vuex'

    export default {
        data: function () {
            return {
              additionalProgressCount: 0
            }
        },
        computed: {
            ...mapState('task', {
                isOpen: 'achieveDialog',
                task: 'selectedTask'
            })
        },
        methods: {
          ...mapActions ('task', {
            achieve: 'achieve'
          })
        },
    }
</script>