import express from "express";

import {
    getProfile, updateProfile, getLatLong
} from "../controllers/profile.controller.js";

const router = express.Router();

router.route("/").get(getProfile);
router.route("/").put(updateProfile);
router.route("/coordinates/:location").get(getLatLong);

export default router;
