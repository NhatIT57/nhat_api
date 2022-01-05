const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into mau_sac(ten_mau_sac, hinh_anh, date_create) values (?, ?, ?)`, [data.ten_mau_sac, data.hinh_anh, data.date_create],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getBy: (ten_giay, callBack) => {
        pool.query(`select * from mau_sac where ten_giay = ?`, [ten_giay], (error, results, fields) => {
            if (error) {
                callBack(error);
            }

            return callBack(null, results[0]);
        });
    },
    getById: (id, callBack) => {
        pool.query(`select * from mau_sac where id = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getAll: (callBack) => {
        pool.query(`select * from mau_sac`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    page: (callBack) => {
        pool.query(`select * from mau_sac limit ? offset ?`, [0, 2], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    update: (data, callBack) => {
        pool.query(
            `update mau_sac set ten_mau_sac=?, hinh_anh=?, date_update=? where id = ?`, [data.ten_mau_sac, data.hinh_anh, data.date_update, data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    delete: (data, callBack) => {
        pool.query(`DELETE FROM mau_sac WHERE id = ?`, [data.id], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
};