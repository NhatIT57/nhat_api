const pool = require("../../config/database");

module.exports = {
    getAllGiay: (callBack) => {
        pool.query(
            `SELECT count(id) as tong from giay`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAllLoaiGiay: (callBack) => {
        pool.query(
            `SELECT count(id) as tong from loai_giay`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAllGiayHot: (callBack) => {
        pool.query(
            `SELECT g.ten_giay, sum(c.so_luong) as so_luong, sum(c.tong_tien) as tong_tien from giay as g, chi_tiet_don_hang as c, dat_hang as d WHERE d.id = c.id_dat_hang and c.id_giay = g.id GROUP BY c.id_giay ORDER BY sum(c.tong_tien) DESC LIMIT 5`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getGiayHotByMonth: (data, callBack) => {
        pool.query(
            `SELECT g.ten_giay, sum(c.so_luong) as so_luong, sum(c.tong_tien) as tong_tien from giay as g, chi_tiet_don_hang as c, dat_hang as d WHERE d.id = c.id_dat_hang and c.id_giay = g.id and MONTH(CURDATE()) = ${data.thang} GROUP BY c.id_giay  ORDER BY sum(c.tong_tien) DESC LIMIT 5`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getLoaiGiayHotByMonth: (data, callBack) => {
        pool.query(
            `SELECT l.ten_loai_giay, sum(c.so_luong) as so_luong, sum(c.tong_tien) as tong_tien from giay as g, chi_tiet_don_hang as c, dat_hang as d, loai_giay as l WHERE d.id = c.id_dat_hang and c.id_giay = g.id and l.id = g.id_loai_giay and MONTH(CURDATE()) = ${data.thang} GROUP BY l.id ORDER BY sum(c.tong_tien) DESC`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};