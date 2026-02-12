import express from "express";
import { getConfig, setCredits } from "../controllers/config.controller.js";

const router = express.Router();

router.get("/get-config", getConfig);
router.post("/set-credits", setCredits);

export default router;
