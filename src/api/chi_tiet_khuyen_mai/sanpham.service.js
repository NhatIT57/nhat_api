const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into chi_tiet_khuyen_mai(id_khuyen_mai, id_giay, gia_ban_khuyen_mai) values (?,?,?)`, [data.id_khuyen_mai, data.id_giay, data.gia_ban_khuyen_mai],
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
        pool.query(`select * from chi_tiet_khuyen_mai`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
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
            `update chi_tiet_khuyen_mai set gia_ban_khuyen_mai=? where id_khuyen_mai=? and id_giay=?`, [data.gia_ban_khuyen_mai, data.id_khuyen_mai, data.id_giay],
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
            `DELETE FROM chi_tiet_khuyen_mai WHERE id_khuyen_mai=? and id_giay=?`, [data.id_khuyen_mai, data.id_giay],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
};