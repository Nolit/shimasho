<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <v-card>
          <v-card-text>
            <v-flex>
              <v-text-field
                label="タイトル"
                v-model="form.title"
              ></v-text-field>
              <v-text-field
                label="目標数"
                type="number"
                v-model.number="form.amount"
              ></v-text-field>
              <v-menu
                ref="dueDateDialog"
                :close-on-content-click="false"
                v-model="dueDateDialog"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="dueDateFormatted"
                  label="実施日"
                  persistent-hint
                  prepend-icon="event"
                ></v-text-field>
                <v-date-picker v-model="form.dueDate" no-title @input="dueDateDialog = false"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click="close()">キャンセル</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="create(form);close()" right>作成</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapMutations, mapState, mapActions  } from 'vuex'

export default {
    data: function () {
        return {
            form: null,
            dueDateDialog: false,
        }
    },
    created: function () {
        this.initializeForm()
    },
    mounted: function () {
        this.initializeForm()
    },
    methods: {
        initializeForm: function () {
            this.form = {
                title: '',
                amount: 0,
                dueDate: null
            }
        },
        ...mapMutations('task', {
            close: 'closeCreationDialog',
        }),
        ...mapActions ('task', [
            'create'
        ])
    },
    computed: {
        dueDateFormatted: function () {
            if (!this.form.dueDate) return ''
            const [year, month, day] = this.form.dueDate.split('-')
            return `${year}年${month}月${day}日`
        },
        ...mapState('task', {
            isOpen: 'creationDialog'
        })
    }
}

</script>