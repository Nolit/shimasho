module.exports = {
    modules: [
        // この行を追加して有効化4
        '@nuxtjs/vuetify'
    ],
    manifest: {
        name: "QUANON's Page",
        lang: 'ja'
    },

    vuetify: {
        // Vuetify の設定はここに書く
        theme: {
            primary: '#3f51b5',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c'
        }
    },
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
    }
}