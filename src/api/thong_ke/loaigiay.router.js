const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
import * as controller from "./loaiGiay.controller";
router.get("/getAllGiay", controller.getAllGiay);
router.get("/getAllLoaiGiay", controller.getAllLoaiGiay);
router.get("/getAllGiayHot", controller.getAllGiayHot);
router.post("/getGiayHotByMonth", controller.getGiayHotByMonth);
router.post("/getLoaiGiayHotByMonth", controller.getLoaiGiayHotByMonth);

module.exports = router;