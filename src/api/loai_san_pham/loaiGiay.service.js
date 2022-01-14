const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into loai_giay( ten_loai_giay, trang_thai, mo_ta, date_create, hinh_anh) values (?,?,?, ?, ?)`, [data.ten_loai_giay, data.trang_thai, data.mo_ta, data.date_create, data.hinh_anh],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    getLoaiGiayTen: (ten_loai_giay, callBack) => {
        pool.query(`select * from loai_giay where ten_loai_giay = ?`, [ten_loai_giay], (error, results, fields) => {
            if (error) {
                callBack(error);
            }

            return callBack(null, results[0]);
        });
    },
    getUserByLoaiGiayId: (id, callBack) => {
        pool.query(`select * from loai_giay where id = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getLoaiGiay: (callBack) => {
        pool.query(`select * from loai_giay`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },

    getLoaiGiayTC: (callBack) => {
        pool.query(`SELECT l.*, count(g.id) as so_luong from giay as g, loai_giay as l WHERE g.id_loai_giay = l.id GROUP BY l.id`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    updateLoaiGiay: (data, callBack) => {
        pool.query(
            `update loai_giay set ten_loai_giay=?, trang_thai=?, mo_ta=?, date_update = ?, hinh_anh=? where id = ?`, [data.ten_loai_giay, data.trang_thai, data.mo_ta, data.date_update, data.hinh_anh, data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteLoaiGiay: (data, callBack) => {
        pool.query(`DELETE FROM loai_giay WHERE id = ?`, [data.id], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
};