import express from "express";

import {
    test,
    apiNewDeveloper,
    registerApp,
    getLights,
    getLight,
    putLight,
    adjustLight
} from "../controllers/api.controller.js";

const router = express.Router();

router.route("/test").get(test);
router.route("/newdeveloper").get(apiNewDeveloper);
router.route("/newdeveloper").post(registerApp);
router.route("/lights/:id").get(getLight);
router.route("/lights").get(getLights);
router.route("/lights/:id/:state").put(putLight);
router.route("/lights/:id/:bri/:sat/:hue").put(adjustLight);
export default router;
