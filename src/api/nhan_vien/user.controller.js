const {
    create,
    getUserByUserUsername,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    page,
} = require('./user.service');
const { compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

function kt(a, b) {
    if (a == b) return true;
    return false;
}
module.exports = {
    createUser: (req, res) => {
        const body = req.body;

        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);

        create(body, (err, results) => {
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
        page((err, results) => {
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
    login: (req, res) => {
        const body = req.body;

        getUserByUserUsername(body.username, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: 'Invalid email or password',
                });
            }
            const result = compareSync(body.password, results.password);
            if (body.password === results.password) {
                const jsontoken = sign({ result: results }, 'qwe1234', {
                    expiresIn: '365d',
                });
                return res.json({
                    success: 1,
                    message: 'login successfully',
                    token: jsontoken,
                });
            } else {
                return res.json({
                    success: 0,
                    data: 'Invalid email or password',
                });
            }
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
                    message: 'Record not Found',
                });
            }

            return res.json({
                success: 1,
                data: results,
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
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
    updateUsers: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        console.log(body.username);
        updateUser(body, (err, results) => {
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
    deleteUser: (req, res) => {
        const data = req.body;

        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(results);
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