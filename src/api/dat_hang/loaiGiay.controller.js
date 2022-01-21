import * as loaigiay from "./loaiGiay.service";
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

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

    getByid: (req, res) => {
        const id = req.params.id;
        loaigiay.getById(id, (err, results) => {
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
    getTinhThanh: (req, res) => {
        loaigiay.getTinhThanh((err, results) => {
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
    update: (req, res) => {
        const body = req.body;
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

    page: (req, res) => {
        const body = req.body;
        loaigiay.page(body, (err, results) => {
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
        loaigiay.pageSearch(body, (err, results) => {
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


    pageSearchByID: (req, res) => {
        const body = req.body;
        loaigiay.pageSearchByID(body, (err, results) => {
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

    getCTDonHangByID: (req, res) => {
        const body = req.body;
        loaigiay.getCTDonHangByID(body, (err, results) => {
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

    getGiayByID: (req, res) => {
        const body = req.body;
        loaigiay.getGiayByID(body, (err, results) => {
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

    getDonHangByID: (req, res) => {
        const body = req.body;
        loaigiay.getDonHangByID(body, (err, results) => {
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

    getDonHangByEmail: (req, res) => {
        const body = req.body;
        loaigiay.getDonHangByEmail(body, (err, results) => {
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

    getDonHangBySDT: (req, res) => {
        const body = req.body;
        loaigiay.getDonHangBySDT(body, (err, results) => {
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

    getDonHangByEmailAll: (req, res) => {
        const body = req.body;
        loaigiay.getDonHangByEmailAll(body, (err, results) => {
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

    getDonHangBySDTAll: (req, res) => {
        const body = req.body;
        loaigiay.getDonHangBySDTAll(body, (err, results) => {
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

    updateStatus: (req, res) => {
        const body = req.body;
        loaigiay.updateStatus(body, (err, results) => {
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

    delete: (req, res) => {
        const data = req.body;
        loaigiay.delete(data, (err, results) => {
            if (err) {
                if (err.code === "ER_ROW_IS_REFERENCED_2") {
                    return res.json({
                        success: 500,
                        message: "đơn hàng hiện không thể xóa phẩm không thể xóa",
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