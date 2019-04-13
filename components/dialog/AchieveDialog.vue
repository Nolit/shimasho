<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent>
        <v-card v-if="isOpen">
          <v-card-title>
            <span class="headline">{{ task.title}}</span>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" flat @click="close()">キャンセル</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="achieve()" right>達成</v-btn>
          </v-card-actions>
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
          }),
          ...mapMutations('task', {
              close: 'closeAchieveDialog',
          }),
        },
    }
</script>