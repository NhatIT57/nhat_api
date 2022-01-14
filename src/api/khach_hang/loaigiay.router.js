const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
import * as controller from "./loaiGiay.controller";
router.get("/", controller.getAll);
router.post("/", controller.create);
router.post("/getFBID", controller.getFBID);
router.post("/createAcount", controller.createAcount);
router.post("/getEmail", controller.getEmail);
router.post("/loginFB", controller.loginFB);
router.post("/updateaccessToken", controller.updateaccessToken);
router.post("/loginEmail", controller.loginEmail);
router.post("/", controller.create);
router.post('/getByID', controller.getByid);
router.post("/update", controller.update);
router.post("/delete", controller.delete);
router.post("/page", controller.page);
router.post("/pageSearch", controller.pageSearch);

module.exports = router;