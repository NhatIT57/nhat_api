import * as loaigiay from './loaiGiay.service';

const { compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

function kt(a, b) {
    if (a == b) return true;
    return false;
}
module.exports = {
    createLoaiGiay: (req, res) => {
        const body = req.body;
        console.log(body);
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);

        loaigiay.create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection errror',
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    getLoaiGiayByid: (req, res) => {
        const id = req.params.id;
        loaigiay.getUserByLoaiGiayId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Record not Found',
                });
            }

            return res.json({
                success: 1,
                data: results,
            });
        });
    },
    getLoaiGiay: (req, res) => {
        loaigiay.getLoaiGiay((err, results) => {
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
    updateLoaiGiay: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);

        loaigiay.updateLoaiGiay(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: 'updated successfully',
            });
        });
    },
    deleteLoaiGiay: (req, res) => {
        const data = req.body;
        loaigiay.deleteLoaiGiay(data, (err, results) => {
            if (err) {
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.json({
                        success: 500,
                        message: 'Loại sản phẩm không thể xóa',
                    });
                }
            }
            if (results == 'undefined') {
                return res.json({
                    success: 1,
                    message: 'user deleted successfully',
                });
            }
            return res.json({
                success: 0,
                message: 'Record Not Found',
            });
        });
    },
};