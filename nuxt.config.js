module.exports = {
    modules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/pwa'
    ],
    manifest: {
        name: 'nolit app',
        lang: 'ja'
    },
    vuetify: {
        theme: {
            primary: '#3f51b5',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c'
        }
    },
    // mode: "spa",
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
    },
    workbox: {
        dev: true, //開発環境でもPWA
    },
    dev: true
}