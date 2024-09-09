import { Router } from "express";
import { testEsignet } from "../controllers/oauth2_controllers.js";

const routes = Router();
routes.route("/").get(testEsignet);

export default  routes;