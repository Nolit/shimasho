<template>
    <v-dialog v-model="isOpen" max-width="500px" persistent>
        <v-card v-if="isOpen">
          <v-card-title>
            <span class="headline">ユーザー一覧</span>
          </v-card-title>
          <v-card-text>
            <v-list style="max-height: 350px" class="scroll-y">
                <v-list-item
                    v-for="(user) in users"
                    :key="user.id"
                    @click="follow(user)"
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="user.name"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="close()">キャンセル</v-btn>
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
                users: 'followeeCandidates'
            })
        },
        methods: {
            ...mapActions ('friend', {
                follow: 'follow',
                fetchFolloweeCandidates: 'fetchFolloweeCandidates'
            }),
            ...mapMutations('friend', {
                close: 'closeFollowDialog',
            }),
        },
        watch: {
            isOpen(isOpen) {
                if (isOpen) {
                    this.fetchFolloweeCandidates()
                }
            }
        }
    }
</script>