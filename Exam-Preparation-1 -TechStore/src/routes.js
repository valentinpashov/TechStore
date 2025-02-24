import { Router } from "express"; //2
import homeController from "./controllers/homeController.js"; //4
import authController from "./controllers/authController.js"; //6
import deviceController from "./controllers/deviceController.js"; //21

const routes = Router(); //2

routes.use(homeController); //4
routes.use("/auth", authController); //6  //За всички адреси започващи с  '/auth' използвай  authController
routes.use("/devices", deviceController); //21
routes.all("*", (req, res) => {
  res.render("404");
});

export default routes; //2
