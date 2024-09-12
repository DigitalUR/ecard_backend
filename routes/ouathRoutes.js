import { Router } from "express";

import { getPhoto, oauth2Esignet} from "../controllers/oauth2_controllers.js";

const ouath2Routes = Router();
ouath2Routes.route('/esignet/callback').get(oauth2Esignet);
ouath2Routes.route('/picture/:regno').get(getPhoto);
export default ouath2Routes;