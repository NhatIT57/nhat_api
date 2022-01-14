import * as loaigiay from "./loaiGiay.service";

const { sign } = require("jsonwebtoken");

function kt(a, b) {
    if (a == b) return true;
    return false;
}
module.exports = {
    create: (req, res) => {
        const body = req.body;
        loaigiay.create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    createAcount: (req, res) => {
        const body = req.body;
        loaigiay.createAcount(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    page: (req, res) => {
        const body = req.body;
        loaigiay.page(body, (err, results) => {
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

    pageSearch: (req, res) => {
        const body = req.body;
        loaigiay.pageSearch(body, (err, results) => {
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

    getByid: (req, res) => {
        const body = req.body;
        loaigiay.getById(body, (err, results) => {
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
    getAll: (req, res) => {
        loaigiay.getAll((err, results) => {
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
    getFBID: (req, res) => {
        const body = req.body;
        loaigiay.getFBID(body, (err, results) => {
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
    getEmail: (req, res) => {
        const body = req.body;
        loaigiay.getEmail(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results) {
                return res.json({
                    success: 1,
                    data: results,
                });
            } else {
                return res.json({
                    success: 2,
                });
            }
        });
    },

    loginFB: (req, res) => {
        const body = req.body;
        loaigiay.getFBID(body, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "id Không hợp lệ",
                });
            }
            const jsontoken = sign({ result: results }, "qwe1234", {
                expiresIn: "365d",
            });
            return res.json({
                success: 1,
                message: "login successfully",
                token: jsontoken,
            });
            // console.log.log({ id: results.id, accessToken: body.accessToken });
            // loaigiay.updateaccessToken({ id: results.id, accessToken: body.accessToken }, (err, resultsss) => {
            //     if (err) {
            //         console.log(err);
            //     }
            //     if (!resultsss) {
            //         return res.json({
            //             success: 0,
            //             data: 'update TC',
            //         });
            //     }
            //     const jsontoken = sign({ result: results }, 'qwe1234', {
            //         expiresIn: '365d',
            //     });
            //     return res.json({
            //         success: 1,
            //         message: 'login successfully',
            //         token: jsontoken,
            //     });
            // });
        });
    },
    loginEmail: (req, res) => {
        const body = req.body;
        loaigiay.getEmail(body, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password",
                });
            }
            if (body.password === results.password) {
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "365d",
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    data: results,
                    token: jsontoken,
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password",
                });
            }
        });
    },

    update: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);

        loaigiay.update(body, (err, results) => {
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
    updateaccessToken: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);

        loaigiay.updateaccessToken(body, (err, results) => {
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
    delete: (req, res) => {
        const data = req.body;
        loaigiay.delete(data, (err, results) => {
            if (err) {
                if (err.code === "ER_ROW_IS_REFERENCED_2") {
                    return res.json({
                        success: 500,
                        message: "khách hàng hiện không thể xóa",
                    });
                }
            }
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