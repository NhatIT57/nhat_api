const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into chi_tiet_mau_sac(id_giay, id_mau_sac, hinh_anh) values (?,?,?)`, [data.id_giay, data.id_mau_sac, data.hinh_anh],
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
        pool.query(`select * from chi_tiet_mau_sac where ten_giay = ?`, [ten_giay], (error, results, fields) => {
            if (error) {
                callBack(error);
            }

            return callBack(null, results[0]);
        });
    },
    getById: (id, callBack) => {
        pool.query(`select * from chi_tiet_mau_sac where id = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getAll: (callBack) => {
        pool.query(
            `select c.id, c.hinh_anh, c.id_giay, c.id_mau_sac, m.ten_mau_sac from chi_tiet_mau_sac as c, mau_sac as m where c.id_mau_sac = m.id`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    page: (callBack) => {
        pool.query(`select * from chi_tiet_mau_sac limit ? offset ?`, [0, 2], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    update: (data, callBack) => {
        pool.query(
            `update chi_tiet_mau_sac set id_giay=?, id_mau_sac=?, hinh_anh=? where id = ?`, [data.id_giay, data.id_mau_sac, data.hinh_anh, data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    delete: (data, callBack) => {
        pool.query(`DELETE FROM chi_tiet_mau_sac WHERE id = ?`, [data.id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
};