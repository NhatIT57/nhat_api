const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into chi_tiet_don_hang(id_giay, id_dat_hang, so_luong, id_chi_tiet_mau_sac, tong_tien) values (?,?,?,?,?)`, [data.id_giay, data.id_dat_hang, data.so_luong, data.id_chi_tiet_mau_sac, data.tong_tien],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getById: (id, callBack) => {
        pool.query(`select * from chi_tiet_don_hang where id = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getAll: (callBack) => {
        pool.query(`select * from chi_tiet_don_hang`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    update: (data, callBack) => {
        pool.query(
            `update chi_tiet_don_hang set id_giay=?, id_dat_hang=?, so_luong=?, tong_tien = ? where id = ?`, [data.id_giay, data.id_dat_hang, data.so_luong, data.tong_tien, data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    // delete: (data, callBack) => {
    //     pool.query(`DELETE FROM chi_tiet_don_hang WHERE id = ?`, [data.id], (error, results, fields) => {
    //         if (error) {
    //             return callBack(error);
    //         }
    //         return callBack(null, results[0]);
    //     });
    // },
};