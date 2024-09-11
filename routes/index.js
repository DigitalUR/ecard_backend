import { Router } from "express";
import ouath2Routes from "./ouathRoutes.js";

const routes = Router();

routes.use('oauth2', ouath2Routes)

export default routes;
