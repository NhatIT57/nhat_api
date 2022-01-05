import * as loaigiay from "./loaiGiay.service";

const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

function kt(a, b) {
    if (a == b) return true;
    return false;
}
module.exports = {
    getAllGiay: (req, res) => {
        loaigiay.getAllGiay((err, results) => {
            if (err) {
                return res.json({
                    success: -1,
                    data: [],
                });
            }
            return res.json({
                success: 1,
                data: results,
            });
        });
    },
    getAllLoaiGiay: (req, res) => {
        loaigiay.getAllLoaiGiay((err, results) => {
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
    getAllGiayHot: (req, res) => {
        loaigiay.getAllGiayHot((err, results) => {
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

    getGiayHotByMonth: (req, res) => {
        console.log(req.body)
        const data = req.body;
        loaigiay.getGiayHotByMonth(data,(err, results) => {
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

    getLoaiGiayHotByMonth: (req, res) => {
        const data = req.body;
        loaigiay.getLoaiGiayHotByMonth(data,(err, results) => {
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
};