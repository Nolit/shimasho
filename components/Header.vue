<template>
    <v-toolbar style="background-color: #47b578" dark app>
        <v-toolbar-title @click="$router.push('/')">
            <img width="150" height="50" src="~/assets/images/logo.png">
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn v-if="$route.path !== '/'" flat @click="$router.push('/')">
                <v-icon>logout</v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>