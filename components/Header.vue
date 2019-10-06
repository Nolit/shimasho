<template>
    <v-app-bar style="background-color: black" dark app>
        <v-toolbar-title>
            <img @click="$router.push('/')" width="150" height="50" src="~/assets/images/logo.png" style="cursor: pointer;">
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn v-if="$route.path !== '/'" text @click="$router.push('/')">
                <v-icon>logout</v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>