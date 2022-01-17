const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
import * as controller from "./loaiGiay.controller";
router.get("/getAllGiay", controller.getAllGiay);
router.get("/getAllLoaiGiay", controller.getAllLoaiGiay);
router.get("/getAllGiayHot", controller.getAllGiayHot);
router.post("/getGiayHotByMonth", controller.getGiayHotByMonth);
router.post("/getLoaiGiayHotByMonth", controller.getLoaiGiayHotByMonth);
router.post("/getDoanhThu", controller.getDoanhThu);
router.post("/getDoanhThuMonth", controller.getDoanhThuMonth);
router.post("/getDoanhThuTongTien", controller.getDoanhThuTongTien);
router.post("/getDoanhThuTotal", controller.getDoanhThuTotal);
router.post("/getTonKho", controller.getTonKho);
router.get("/getTonKhoTongTien", controller.getTonKhoTongTien);
router.get("/getTonKhoTotal", controller.getTonKhoTotal);

module.exports = router;