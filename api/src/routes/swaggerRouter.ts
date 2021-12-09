import express from "express";
import swaggerUi from "swagger-ui-express";
// const swaggerUi = require("swagger-ui-express")
// import swaggerJsDoc from "swagger-jsdoc";

let swaggerDoc: Object;
// const swaggerDoc = swaggerJsDoc(options);

try {
  swaggerDoc = require("../../swagger.json");
} catch (error) {
  console.log("***************************************************");
  console.log("  Seems like you doesn`t have swagger.json file");
  console.log("  Please, run: ");
  console.log("  $ swagger-jsdoc -d swaggerDef.js -o swagger.json");
  console.log("***************************************************");
}

/**
 * @description
 *  If swagger.json file exists in root folder, shows swagger api description
 *  else send commands, how to get swagger.json file
 * @constructs
 */
const init = (app: express.Application) => {
  if (swaggerDoc) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  } else {
    app.get("/docs", (req, res) => {
      res.send(
        "<p>Seems like you doesn't have <code>swagger.json</code> file.</p>" +
          "<p>For generate doc file use: <code>swagger-jsdoc -d swaggerDef.js -o swagger.json</code> in terminal</p>" +
          "<p>Then, restart your application</p>"
      );
    });
  }
};

export default { init };
