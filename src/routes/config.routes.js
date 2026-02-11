import express from "express";
import { getConfig } from "../controllers/config.controller.js";

const router = express.Router();

router.get("/get-config", getConfig);

export default router;
