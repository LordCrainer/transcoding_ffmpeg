import colors from 'vuetify/es5/util/colors'
import config from './config'

export default {
  env: config,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - DISTRIBUIDOR DE CONTENIDOS DIGITALES',
    title: 'QUIKOPS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'http://localhost:4000/app/services/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "./plugins/imagenURL.js" },
    { src: "./plugins/vuelidate.js" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa', '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: config.axios.baseUrl || 'http://localhost:3010'
    // proxyHeaders: false
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    icons: {
      iconfont: 'mdiSvg' || 'mdi' // || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#1A2737',
          accent: colors.grey.darken3,
          secondary: colors.orange.darken4,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  proxy: {
    [config.nuxt.proxy.path]: config.nuxt.proxy.target
    /* [config.nuxt.proxy.path]: {
      target: config.nuxt.proxy.target,
      pathRewrite: {
        ["^" + config.nuxt.proxy.path]: "/"
      }
    } */
  },
  build: {
    publicPath: config.publicPath
  },
  generate: {
    dir: config.generateDir
  } /* buildDir: "dest" */,

  router: {
    base: config.routerBase
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL
  },
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  }
}
