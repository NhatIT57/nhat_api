const router = require("express").Router();
const {
  getUserByUserId,
  getUsers,
  page,
  pageTotal,
  pageSearch,
  pageSearchTotal,
  updateUsers,
  deleteUser,
} = require("./user.controller");
// router.get('/', getUsers);
router.post("/page", page);
router.get("/pageTotal", pageTotal);
router.get("/pageSearchTotal", pageSearchTotal);
router.post("/pageSearch", pageSearch);
router.post("/update", updateUsers);
// router.post('/', createUser);
router.get("/:id", getUserByUserId);
router.delete("/", deleteUser);

module.exports = router;
