import { Router } from "express";
import { testEsignet } from "../controllers/oauth2_controllers.js";

const routes = Router();
routes.route("/").get(testEsignet);
routes.route('/apw/oauth2/esignet/callback').get((req, res) => {
    console.log(req.query);
})

export default  routes;