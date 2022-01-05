const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
import * as ctmauSac from "./sanpham.controller";

router.get("/", ctmauSac.getAll);
router.post("/getSize", ctmauSac.getSize);
// router.get('/page', ctmauSac.page);
router.post("/", ctmauSac.create);
// router.get('/:id', ctmauSac.getById);
// router.post('/ten_giay', ctmauSac.getBy);
router.post("/update", ctmauSac.update);
router.post("/delete", ctmauSac.delete);

module.exports = router;