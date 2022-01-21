const {
  create,
  getUserByUserUsername,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  page,
  pageTotal,
  pageSearchTotal,
  pageSearch,
} = require("./user.service");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

function kt(a, b) {
  if (a == b) return true;
  return false;
}
module.exports = {
  // createUser: (req, res) => {
  //     const body = req.body;

  //     // const salt = genSaltSync(10);
  //     // body.password = hashSync(body.password, salt);

  //     create(body, (err, results) => {
  //         if (err) {
  //             console.log(err);
  //             return res.status(500).json({
  //                 success: 0,
  //                 message: 'Database connection errror',
  //             });
  //         }
  //         return res.status(200).json({
  //             success: 1,
  //             data: results,
  //         });
  //     });
  // },
  page: (req, res) => {
    const body = req.body;
    page(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  pageTotal: (req, res) => {
    pageTotal((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  pageSearchTotal: (req, res) => {
    pageSearchTotal((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  pageSearch: (req, res) => {
    const body = req.body;
    pageSearch(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }

      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  // getUsers: (req, res) => {
  //     getUsers((err, results) => {
  //         if (err) {
  //             console.log(err);
  //             return;
  //         }
  //         return res.json({
  //             success: 1,
  //             data: results,
  //         });
  //     });
  // },
  updateUsers: (req, res) => {
    const body = req.body;
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;

    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(results);
      if (results == "undefined") {
        return res.json({
          success: 1,
          message: "user deleted successfully",
        });
      }
      return res.json({
        success: 0,
        message: "Record Not Found",
      });
    });
  },
};
