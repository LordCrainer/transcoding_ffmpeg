import { Router } from "express";
import { IController } from './../../../types/IController';

const prueba: IController = (req, res) => {
  res.send("hello world");
};

const testingRoute = (router: Router) => {
  router.get("/", prueba);

  return router;
};

export default testingRoute;
