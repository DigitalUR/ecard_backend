import { Router } from "express";

import { oauth2Esignet, dataDemo } from "../controllers/oauth2_controllers.js";

const ouath2Routes = Router();
ouath2Routes.route("/").get(dataDemo);
ouath2Routes.route('/esignet/callback').get(oauth2Esignet)

export default ouath2Routes;