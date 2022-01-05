const pool = require('./../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into nhan_vien( username, password, ten_nhan_vien, sdt, gioi_tinh, dia_chi, email) values (?,?,?,?,?,?,?)`, [data.username, data.password, data.ten_nhan_vien, data.sdt, data.gioi_tinh, data.dia_chi, data.email],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    getUserByUserUsername: (username, callBack) => {
        pool.query(`select * from nhan_vien where username = ?`, [username], (error, results, fields) => {
            if (error) {
                callBack(error);
            }

            return callBack(null, results[0]);
        });
    },
    getUserByUserId: (id, callBack) => {
        pool.query(`select * from nhan_vien where id = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getUsers: (callBack) => {
        pool.query(`select * from nhan_vien`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    page: (callBack) => {
        pool.query(`select * from nhan_vien limit ? offset ?`, [2, 2], (error, results, fields) => {
           'select * from giay WHERE id_loai_giay = 43 limit 4 offset 0'
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update nhan_vien set username=?, password=?, ten_nhan_vien=?, sdt=?, gioi_tinh=?, dia_chi=?, email=? where id = ?`, [
                data.username,
                data.password,
                data.ten_nhan_vien,
                data.sdt,
                data.gioi_tinh,
                data.dia_chi,
                data.email,
                data.id,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(`DELETE FROM nhan_vien WHERE id = ?`, [data.id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
};