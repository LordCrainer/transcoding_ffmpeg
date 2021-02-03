const config = require("./config");
module.exports = {
  env: config,
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/socket.client.js" },
    { src: "~/plugins/vuetify.js" },
    { src: "~/plugins/imagenURL.js" },
    { src: "~/plugins/vuelidate.js" }
  ],

  /**
   * AXIOS
   */

  axios: {
    baseURL: config.axios.baseUrl || "http://localhost:3010"
    // proxyHeaders: false
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/dotenv"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  },
  server: {
    port: config.port, // default: 3000
    host: config.host // default: localhost
  },
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
  }
};
