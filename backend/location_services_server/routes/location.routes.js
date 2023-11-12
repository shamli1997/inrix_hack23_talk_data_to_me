import express from "express";

import {
  test,
  findTime,
  findParkingSpots,
  getMidPoint,
} from "../controllers/loacation.controller.js";

const router = express.Router();

router.route("/test").get(test);
router.route("/findtime").get(findTime);
router.route("/findparkingspots").get(findParkingSpots);
router.route("/midpoint").get(getMidPoint);

export default router;
