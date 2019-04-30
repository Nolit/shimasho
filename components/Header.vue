<template>
    <v-toolbar style="background-color: #47b578" dark app>
        <v-toolbar-title>
            Task List
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
        <v-btn flat v-if="$router.currentRoute.path !== '/friends'" @click="$router.push('/friends')">フレンド</v-btn>
        <v-btn flat v-if="$router.currentRoute.path !== '/tasks'" @click="$router.push('/tasks')">タスク</v-btn>
        <v-btn flat @click="$router.push('/')">ログアウト</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>