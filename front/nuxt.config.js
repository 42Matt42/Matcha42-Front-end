import colors from 'vuetify/es5/util/colors'
import { Http2ServerRequest } from 'http2';

export default {
  env: {
    // process.env.baseUrl
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    // 'https://cors-anywhere.herokuapp.com/https://matcha42saubinbartol.herokuapp.com/login'
    serverUrl: process.env.SERVER_URL || 'http://10.11.3.20:8080/api'
  },
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    // headers:
    //   { 'Access-Control-Request-Method': '*' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/proxy'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],
  proxy: {
    '/api': {
      target: 'https://matcha42saubinbartol.herokuapp.com/',
      pathRewrite: {
        '^/api' : '/'
        }
      }
  },
  axios: {
    proxy: true
  },

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    // treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        primary: {
          primary: colors.indigo.darken1,
          accent: colors.grey.darken3,
          secondary: colors.deepPurple.darken1,
          info: colors.purple.accent2,
          warning: colors.amber.base,
          error: colors.deepOrange.lighten4,
          success: colors.lightGreen.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
