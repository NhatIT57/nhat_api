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
            `SELECT g.ten_giay, sum(c.so_luong) as so_luong, sum(c.tong_tien) as tong_tien from giay as g, chi_tiet_don_hang as c, dat_hang as d WHERE d.id = c.id_dat_hang and c.id_giay = g.id and d.thoi_gian_dat BETWEEN '${data.from_date}' and '${data.to_date}' and d.trang_thai = 2 GROUP BY c.id_giay  ORDER BY sum(c.tong_tien) DESC LIMIT 10`, [],
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
            `SELECT l.ten_loai_giay, sum(c.so_luong) as so_luong, sum(c.tong_tien) as tong_tien from giay as g, chi_tiet_don_hang as c, dat_hang as d, loai_giay as l WHERE d.id = c.id_dat_hang and c.id_giay = g.id and l.id = g.id_loai_giay and d.thoi_gian_dat BETWEEN '${data.from_date}' and '${data.to_date}' and d.trang_thai = 2 GROUP BY l.id ORDER BY sum(c.tong_tien) DESC`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDoanhThu: (data, callBack) => {
        pool.query(
            `SELECT g.id, g.ten_giay, g.id_loai_giay, l.ten_loai_giay, g.gia_ban, g.gia_ban_goc, sum(c.so_luong) as so_luong, sum(c.tong_tien) as tong_tien from giay as g, chi_tiet_don_hang as c, dat_hang as d, loai_giay as l, tinh_thanh_pho as t WHERE d.id = c.id_dat_hang and c.id_giay = g.id and g.id_loai_giay = l.id and d.matp = t.matp and d.thoi_gian_dat BETWEEN '${data.from_date}' and '${data.to_date}' and d.trang_thai = 2 GROUP BY l.id  ORDER BY sum(c.tong_tien) DESC`, [data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDoanhThuTotal: (data, callBack) => {
        pool.query(
            `SELECT count(*) as total from (SELECT count(c.id_giay) from giay as g, chi_tiet_don_hang as c, dat_hang as d WHERE d.id = c.id_dat_hang and c.id_giay = g.id and d.thoi_gian_dat BETWEEN '${data.from_date}' and '${data.to_date}' and d.trang_thai = 2 GROUP BY c.id_giay) as Z`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },



    getDoanhThuTongTien: (data, callBack) => {
        pool.query(
            `SELECT sum(c.so_luong*g.gia_ban) as tong_tien, sum(c.so_luong*g.gia_ban_goc) as tong_tien_goc from giay as g, chi_tiet_don_hang as c, dat_hang as d WHERE d.id = c.id_dat_hang and c.id_giay = g.id and d.thoi_gian_dat BETWEEN '${data.from_date}' and '${data.to_date}' and d.trang_thai = 2`, [data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDoanhThuMonth: (data, callBack) => {
        pool.query(
            `select date_format(d.thoi_gian_dat, '%M %Y'), sum(c.tong_tien) from dat_hang as d, chi_tiet_don_hang as c WHERE d.id = c.id_dat_hang and d.thoi_gian_dat BETWEEN '${data.from_date}' and '${data.to_date}' and d.trang_thai = 2 group by date_format(d.thoi_gian_dat, '%M %Y')`, [data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    getTonKho: (data, callBack) => {
        pool.query(
            `SELECT g.id, g.ten_giay, g.id_loai_giay, l.ten_loai_giay, g.gia_ban, g.gia_ban_goc, sum(cs.so_luong) as so_luong, SUM(cs.so_luong * gia_ban) as tong_tien, SUM(cs.so_luong * gia_ban_goc) as tong_tien_goc from loai_giay as l, giay as g, chi_tiet_mau_sac as c, chi_tiet_mau_sac_size as cs WHERE l.id = g.id_loai_giay and g.id = c.id_giay and c.id = cs.id_ct_mau_sac and g.trang_thai = 1 and cs.so_luong>0 GROUP BY g.id limit ? offset ?`, [data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getTonKhoTongTien: (callBack) => {
        pool.query(
            `SELECT sum(cs.so_luong) as so_luong, sum(cs.so_luong * gia_ban) as tong_tien, sum(cs.so_luong * gia_ban_goc) as tong_tien_goc from loai_giay as l, giay as g, chi_tiet_mau_sac as c, chi_tiet_mau_sac_size as cs WHERE l.id = g.id_loai_giay and g.id = c.id_giay and c.id = cs.id_ct_mau_sac and g.trang_thai = 1 and cs.so_luong > 0 `, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getTonKhoTotal: (callBack) => {
        pool.query(
            `SELECT count(*) as total from (SELECT g.id, g.ten_giay, g.id_loai_giay, l.ten_loai_giay, g.gia_ban, g.gia_ban_goc, sum(cs.so_luong) as so_luong, SUM(cs.so_luong * gia_ban) as tong_tien, SUM(cs.so_luong * gia_ban_goc) as tong_tien_goc from loai_giay as l, giay as g, chi_tiet_mau_sac as c, chi_tiet_mau_sac_size as cs WHERE l.id = g.id_loai_giay and g.id = c.id_giay and c.id = cs.id_ct_mau_sac and g.trang_thai = 1 and cs.so_luong>0 GROUP BY g.id) as Z`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

};