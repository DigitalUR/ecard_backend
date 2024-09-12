import { Router } from "express";

import { oauth2Esignet, getImage } from "../controllers/oauth2_controllers.js";

const ouath2Routes = Router();
ouath2Routes.route('/esignet/callback').get(oauth2Esignet)
ouath2Routes.route('/getImage/:imageFileName').get(getImage)

export default ouath2Routes;