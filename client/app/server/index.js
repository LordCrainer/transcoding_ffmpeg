const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const app = require("express")();
const config = require("../nuxt.config.js");
const isDevelopMode = process.env.NODE_ENV !== "production";

async function start() {
  try {
    const nuxt = new Nuxt(config);
    const { host } = nuxt.options.server;
    const port = config.env.port;
    if (isDevelopMode) {
      const builder = new Builder(nuxt);
      await builder.build();
    } else {
      console.log("NUXT READY!!!");
      await nuxt.ready();
    }

    app.use(nuxt.render);

    app.listen(port, () => {
      consola.success({
        message: `Server listening on ${host}:${port}`,
        badge: true
      });
    });
  } catch (error) {
    console.log(error);
  }
}

start();
