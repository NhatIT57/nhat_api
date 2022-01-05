const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into chi_tiet_mau_sac_size(id_ct_mau_sac, id_size, so_luong) values (?,?,?)`, [data.id_ct_mau_sac, data.id_size, data.so_luong],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    // getBy: (ten_giay, callBack) => {
    //     pool.query(`select * from chi_tiet_mau_sac_size where chi_tiet_mau_sac_size = ? and id_size=?`, [ten_giay], (error, results, fields) => {
    //         if (error) {
    //             callBack(error);
    //         }

    //         return callBack(null, results[0]);
    //     });
    // },
    // getById: (id, callBack) => {
    //     pool.query(`select * from chi_tiet_mau_sac where id = ?`, [id], (error, results, fields) => {
    //         if (error) {
    //             callBack(error);
    //         }
    //         return callBack(null, results[0]);
    //     });
    // },
    getAll: (callBack) => {
        pool.query(
            `select * from chi_tiet_mau_sac_size as c, size as s where c.id_size = s.id`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSize: (data, callBack) => {
        pool.query(
            `SELECT * from chi_tiet_mau_sac_size as cmss WHERE cmss.id_size= ${data.id_size} and cmss.id_ct_mau_sac IN (SELECT cms.id from chi_tiet_mau_sac as cms WHERE cms.id_giay = '${data.id_giay}' and cms.id_mau_sac = ${data.id_mau_sac})`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    // page: (callBack) => {
    //     pool.query(`select * from chi_tiet_mau_sac limit ? offset ?`, [0, 2], (error, results, fields) => {
    //         if (error) {
    //             callBack(error);
    //         }
    //         return callBack(null, results);
    //     });
    // },
    update: (data, callBack) => {
        pool.query(
            `update chi_tiet_mau_sac_size set so_luong=? where id_ct_mau_sac=? and id_size=?`, [data.so_luong, data.id_ct_mau_sac, data.id_size],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    delete: (data, callBack) => {
        pool.query(
            `DELETE FROM chi_tiet_mau_sac_size WHERE id_ct_mau_sac=? and id_size=?`, [data.id_ct_mau_sac, data.id_size],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
};