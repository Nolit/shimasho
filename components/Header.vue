<template>
    <v-toolbar style="background-color: #47b578" dark app>
        <v-toolbar-title>
            Task List
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn flat @click="$router.push('/')">ログアウト</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>