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
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="close()">キャンセル</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="progress(additionalProgressCount)" right>ステップアップ</v-btn>
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
                isOpen: 'stepUpDialog',
                task: 'selectedTask'
            })
        },
        methods: {
          progress (count) {
            this.$store.dispatch('task/progress', count).then(response => {
              this.$toasted.success("ステップアップ！")
            })
          },
          ...mapMutations('task', {
              close: 'closeStepUpDialog',
          }),
        },
        watch: {
          isOpen(isOpen) {
              if (isOpen) {
                  this.additionalProgressCount = 0
              }
          }
        }
    }
</script>