<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent>
        <v-card v-if="isOpen">
          <v-card-title>
            <span class="headline">{{ task.title}}</span>
            【{{ task.progress}} / {{ task.amount}}】
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="進捗数"
              type="number"
              v-model.number="additionalProgressCount"
            ></v-text-field>
            <div style="text-align: right">
            <v-btn
              dark
              style="background-color: #b5474c"
              @click="progress(additionalProgressCount)"
            >
                ステップアップ
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
                isOpen: 'stepUpDialog',
                task: 'selectedTask'
            })
        },
        methods: {
          ...mapActions ('task', {
            progress: 'progress'
          })
        },
    }
</script>