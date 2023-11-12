import express from "express";

import { test, findTime } from "../controllers/loacation.controller.js";

const router = express.Router();

router.route("/test").get(test);
router.route("/findtime").get(findTime);

export default router;
