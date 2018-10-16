<template>
  <v-app light>
    <v-toolbar color="green darken-2" dark app>
      <v-toolbar-title>Task Details</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-layout mt-5>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title>
              <h1>{{ task.title }}</h1>
            </v-card-title>
            <v-card-text>
                {{ task.description }}
            </v-card-text>
            <v-card-actions v-if="isNormal">
                <v-spacer></v-spacer>
                <v-btn flat color="green" @click="complete()">Complete</v-btn>
            </v-card-actions>
            <v-card-actions v-if="isTimer">
                Timerのアクション
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
    <v-footer app>ここはフッターです</v-footer>
  </v-app>
</template>

<script>
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);

const task = {
    id: 1,
    title: 'テスト用タスク',
    description: 'テスト用タスクの概要',
    type: 'normal'
}

mock.onPost('/tasks/2').reply(200, {
    task: task
});

mock.onPost('/task/complete').reply(200, {
    isSuccess: true
});

export default {
    head: {
        title: 'Task Details'
    },
    data: function () {
        return {
            task: task
        }
    },
    asyncData (context) {
        console.log('aaa')
        console.log(context)
        let response = axios.post(`/tasks/${context.params.id}`);
        return response.data;
     },
     methods: {
        async complete () {
            let response = await axios.post('/task/complete', { taskId: this.task.id })
            console.log(response.data);
            if (response.data.isSuccess) {
                alert('Complete Success')
                location.href = '/users'
            }
        }
     },
    computed: {
        isNormal: function () {
            return this.task.type === 'normal'
        },
        isTimer: function () {
            return this.task.type === 'timer'
        }
    }
}
</script>