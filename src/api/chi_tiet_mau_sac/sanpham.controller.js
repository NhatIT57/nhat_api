import * as ctmauSac from './sanpham.service';
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

function kt(a, b) {
    if (a == b) return true;
    return false;
}
module.exports = {
    create: (req, res) => {
        const body = req.body;

        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);

        ctmauSac.create(body, (err, results) => {
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
    page: (req, res) => {
        ctmauSac.page((err, results) => {
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
        ctmauSac.getById(id, (err, results) => {
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
    getBy: (req, res) => {
        const ten_mau_sac = req.body.ten_mau_sac;
        ctmauSac.getBy(ten_mau_sac, (err, results) => {
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
    getAll: (req, res) => {
        ctmauSac.getAll((err, results) => {
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
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        console.log(body.username);
        ctmauSac.update(body, (err, results) => {
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
    delete: (req, res) => {
        const data = req.body;

        ctmauSac.delete(data, (err, results) => {
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