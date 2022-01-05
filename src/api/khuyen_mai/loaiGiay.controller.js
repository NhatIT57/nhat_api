import * as loaigiay from './loaiGiay.service';

// const { compareSync } = require('bcrypt');
// const { sign } = require('jsonwebtoken');

module.exports = {
    create: (req, res) => {
        const body = req.body;
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
    getKhuyenMaiNow: (req, res) => {
        const body = req.body;
        loaigiay.getKhuyenMaiNow(body, (err, results) => {
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
    getSanPhamKMNow: (req, res) => {
        const body = req.body;
        loaigiay.getSanPhamKMNow(body, (err, results) => {
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
    getById: (req, res) => {
        const id = req.params.id;
        loaigiay.getById(id, (err, results) => {
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
    getKhuyenMai: (req, res) => {
        loaigiay.getKhuyenMai((err, results) => {
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
    updateKhuyenMai: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);

        loaigiay.updateKhuyenMai(body, (err, results) => {
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
    deleteKhuyenMai: (req, res) => {
        const data = req.body;
        loaigiay.deleteKhuyenMai(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
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