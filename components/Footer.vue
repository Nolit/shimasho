<template>
    <v-tabs
        centered
        icons-and-text
        app
        hide-slider="true"
    >
        <v-tab @click="$router.push('/tasks')" :key="'tasks'">
            Task
            <v-icon>list</v-icon>
        </v-tab>
        <v-tab active @click="$router.push('/timelines')" :key="'timeline'">
            Timeline
            <v-icon>timeline</v-icon>
        </v-tab>
        <v-tab @click="$router.push('/friends')" :key="'friends'">
            Friend
            <v-icon>group</v-icon>
        </v-tab>
    </v-tabs>
</template>