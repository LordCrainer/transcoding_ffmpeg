const config = {
  axios: {
    baseUrl: process.env.BASE_URL
  },
  nodeEnv: process.env.NODE_ENV,
  host: process.env.HOST,
  port: process.env.PORT,
  nuxt: {
    proxy: {
      path: process.env.PROXY_PATH,
      target: process.env.PROXY_TARGET
    }
  },
  routerBase: process.env.ROUTER_BASE,
  publicPath: process.env.PUBLIC_PATH,
  generateDir: process.env.GENERATE_DIR,
  socket: {
    path: process.env.SOCKET_PATH,
    server: process.env.SOCKET_SERVER
  }
}

// const node_env = process.env.DEPLOY_ENV;

export default config
