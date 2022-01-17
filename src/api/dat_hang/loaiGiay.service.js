const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into dat_hang(id_khach_hang, trang_thai, thoi_gian_dat, ten_nguoi_nhan, sdt_nguoi_nhan, dia_chi_nguoi_nhan,email, matp, tong_tien, date_create) values (?,?,?,?,?,?,?,?)`, [
                data.id_khach_hang,
                data.trang_thai,
                data.thoi_gian_dat,
                data.ten_nguoi_nhan,
                data.sdt_nguoi_nhan,
                data.dia_chi_nguoi_nhan,
                data.email,
                data.matp,
                data.tong_tien,
                data.date_create,
            ],
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
        pool.query(
            `select * from dat_hang where id = ?`, [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getAll: (callBack) => {
        pool.query(`select * from dat_hang`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    update: (data, callBack) => {
        pool.query(
            `update dat_hang set id_khach_hang=?, trang_thai=?, thoi_gian_dat=?, ten_nguoi_nhan = ?, sdt_nguoi_nhan=?, dia_chi_nguoi_nhan=?,date_update=? where id = ?`, [
                data.id_khach_hang,
                data.trang_thai,
                data.thoi_gian_dat,
                data.ten_nguoi_nhan,
                data.sdt_nguoi_nhan,
                data.dia_chi_nguoi_nhan,
                data.date_update,
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
    delete: (data, callBack) => {
        pool.query(
            `DELETE FROM dat_hang WHERE id = ?`, [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    page: (data, callBack) => {
        if (data.trang_thai) {
            pool.query(
                `select * from dat_hang where trang_thai =? limit 6 offset ?`, [data.trang_thai, data.offset],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }
                    return callBack(null, results);
                }
            );
        } else {
            pool.query(
                `select * from dat_hang limit 6 offset ?`, [data.offset],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }
                    return callBack(null, results);
                }
            );
        }
    },
    pageSearch: (data, callBack) => {
        if (data.trang_thai) {
            pool.query(
                `select * from dat_hang where trang_thai =?`, [data.trang_thai],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }
                    return callBack(null, results);
                }
            );
        } else {
            pool.query(`select * from dat_hang`, [], (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            });
        }
    },


    pageSearchByID: (data, callBack) => {
        if (data.id) {
            pool.query(
                `select * from dat_hang where id =?`, [data.id],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }
                    return callBack(null, results);
                }
            );
        } else {
            pool.query(`select * from dat_hang`, [], (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            });
        }
    },

    getDonHangByID: (data, callBack) => {
        pool.query(
            `SELECT d.*, k.ten_khach_hang from dat_hang as d, khach_hang as k WHERE k.id = d.id_khach_hang and d.id = ?`, [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getGiayByID: (data, callBack) => {
        pool.query(
            `SELECT c.*,  m.*, ct_ms.hinh_anh as hinh_anh FROM dat_hang as d, chi_tiet_don_hang as c, giay as m, chi_tiet_mau_sac as ct_ms WHERE d.id = c.id_dat_hang and c.id_giay = m.id and ct_ms.id = c.id_chi_tiet_mau_sac and  d.id = ?`, [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getCTDonHangByID: (data, callBack) => {
        pool.query(
            `SELECT c.*, m.ten_giay as ten_giay from dat_hang as d, chi_tiet_don_hang as c, giay as m WHERE d.id = c.id_dat_hang and c.id_giay = m.id and d.id = ?`, [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDonHangByEmail: (data, callBack) => {
        pool.query(
            `SELECT d.id as ma_don_hang, d.ten_nguoi_nhan, d.sdt_nguoi_nhan, d.email, d.dia_chi_nguoi_nhan, d.thoi_gian_dat, d.trang_thai, sum(c.so_luong) as so_luong, sum(c.tong_tien) as tong_tien from chi_tiet_don_hang as c, khach_hang as k, dat_hang as d WHERE k.id = d.id_khach_hang and d.id = c.id_dat_hang and d.email = '${data.email}' GROUP BY d.id LIMIT ? OFFSET ?;`, [data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDonHangBySDT: (data, callBack) => {
        pool.query(
            `SELECT d.id as ma_don_hang, d.ten_nguoi_nhan, d.sdt_nguoi_nhan, d.email, d.dia_chi_nguoi_nhan, d.thoi_gian_dat, d.trang_thai, sum(c.so_luong) as so_luong, sum(c.tong_tien) as tong_tien from chi_tiet_don_hang as c, khach_hang as k, dat_hang as d WHERE k.id = d.id_khach_hang and d.id = c.id_dat_hang and d.sdt_nguoi_nhan = '${data.sdt}' GROUP BY d.id LIMIT ? OFFSET ?;`, [data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDonHangByEmailAll: (data, callBack) => {
        pool.query(
            `SELECT d.id as ma_don_hang, d.ten_nguoi_nhan, d.sdt_nguoi_nhan, d.email, d.dia_chi_nguoi_nhan, d.thoi_gian_dat, d.trang_thai, sum(c.so_luong) as so_luong, sum(c.tong_tien) as tong_tien from chi_tiet_don_hang as c, khach_hang as k, dat_hang as d WHERE k.id = d.id_khach_hang and d.id = c.id_dat_hang and d.email = '${data.email}' GROUP BY d.id;`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDonHangBySDTAll: (data, callBack) => {
        pool.query(
            `SELECT d.id as ma_don_hang, d.ten_nguoi_nhan, d.sdt_nguoi_nhan, d.email, d.dia_chi_nguoi_nhan, d.thoi_gian_dat, d.trang_thai, sum(c.so_luong) as so_luong, sum(c.tong_tien) as tong_tien from chi_tiet_don_hang as c, khach_hang as k, dat_hang as d WHERE k.id = d.id_khach_hang and d.id = c.id_dat_hang and d.sdt_nguoi_nhan = '${data.sdt}' GROUP BY d.id;`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateStatus: (data, callBack) => {
        pool.query(
            `update dat_hang set date_update=?, trang_thai=? where id = ?`, [data.date_update, data.trang_thai, data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
};