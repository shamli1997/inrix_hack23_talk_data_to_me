import express from "express";

import { test } from "../controllers/loacation.controller.js";

const router = express.Router();

router.route("/test").get(test);
export default router;
