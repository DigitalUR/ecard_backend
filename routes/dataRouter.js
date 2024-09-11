import express from "express";
import dataController from "../controllers/dataController.js";

const router = express.Router();

router.get("/data", dataController.getData);

export default router;
