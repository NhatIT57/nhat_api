const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
import * as ctmauSac from "./sanpham.controller";
router.get("/", ctmauSac.getAll);
router.get("/page", ctmauSac.page);
router.post("/", ctmauSac.create);

router.patch("/", ctmauSac.update);
router.post("/delete", ctmauSac.delete);

module.exports = router;