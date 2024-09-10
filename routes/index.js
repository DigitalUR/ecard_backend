import { Router } from "express";

import { oauth2Esignet, testEsignet } from "../controllers/oauth2_controllers.js";

const routes = Router();
routes.route("/").get(testEsignet);
routes.route('/api/oauth2/esignet/callback').get(oauth2Esignet)

export default  routes;