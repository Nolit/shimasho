<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent>
        <v-card v-if="isOpen">
          <v-card-title>
            <span class="headline">ユーザー一覧</span>
          </v-card-title>
          <v-card-text>
            <v-list>
                <v-list-tile
                    v-for="(user) in users"
                    :key="user.id"
                    @click="follow(user)"
                >
                    <v-list-tile-content>
                        <v-list-tile-title v-text="user.name"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click="close()">キャンセル</v-btn>
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
            ...mapState('friend', {
                isOpen: 'followDialog',
                users: 'followCandidates'
            })
        },
        methods: {
            ...mapActions ('friend', {
                follow: 'follow',
                fetchFollowCandidates: 'fetchFollowCandidates'
            }),
            ...mapMutations('friend', {
                close: 'closeFollowDialog',
            }),
        },
        watch: {
            isOpen(isOpen) {
                if (isOpen) {
                    this.fetchFollowCandidates()
                }
            }
        }
    }
</script>