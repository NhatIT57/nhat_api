const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into giay(id, ten_giay, mo_ta, id_loai_giay, date_create, gia_ban, gia_ban_goc, trang_thai) values (?,?,?,?,?,?,?,?)`, [
                data.id_g,
                data.ten_giay,
                data.mo_ta,
                data.id_loai_giay,
                data.date_create,
                data.gia_ban,
                data.gia_ban_goc,
                data.trang_thai,
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
    getUserByGiayTen_giay: (ten_giay, callBack) => {
        pool.query(
            `select * from giay where ten_giay = ?`, [ten_giay],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results[0]);
            }
        );
    },
    getUserByGiayId: (id, callBack) => {
        pool.query(
            `select * from giay where id = ?`, [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    page: (data, callBack) => {
        if (data.id_loai_giay !== 0) {
            pool.query(
                `select g.*, c.hinh_anh from giay as g, mau_sac as m, chi_tiet_mau_sac as c WHERE id_loai_giay = ? and g.id = c.id_giay and c.id_mau_sac = m.id GROUP BY g.id limit ? offset ?`, [data.id_loai_giay, data.limit, data.offset],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }

                    return callBack(null, results);
                }
            );
        } else {
            pool.query(
                `select g.*, c.hinh_anh from giay as g, mau_sac as m, chi_tiet_mau_sac as c WHERE g.id = c.id_giay and c.id_mau_sac = m.id GROUP BY g.id limit ? offset ?`, [data.limit, data.offset],
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
        if (data.ten_giay !== "") {
            pool.query(
                `select g.*, c.hinh_anh from giay as g, mau_sac as m, chi_tiet_mau_sac as c WHERE g.ten_giay like '%${data.ten_giay}%' and g.id = c.id_giay and c.id_mau_sac = m.id GROUP BY g.id limit ? offset ?`, [data.limit, data.offset],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }

                    return callBack(null, results);
                }
            );
        } else {
            pool.query(
                `select g.*, c.hinh_anh from giay as g, mau_sac as m, chi_tiet_mau_sac as c WHERE g.id = c.id_giay and c.id_mau_sac = m.id GROUP BY g.id limit ? offset ?`, [data.limit, data.offset],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }

                    return callBack(null, results);
                }
            );
        }
    },

    pageSearchMSAll: (data, callBack) => {
        pool.query(
            `select g.id as id_giay, g.ten_giay, g.gia_ban, g.gia_ban_goc, g.id_loai_giay, g.mo_ta, m.id, m.id_mau_sac, ms.ten_mau_sac, m.hinh_anh, s.id_size, si.ten_size, s.so_luong from giay as g, chi_tiet_mau_sac as m, chi_tiet_mau_sac_size as s, mau_sac as ms, size as si WHERE g.id = m.id_giay  and m.id_mau_sac = ms.id and  m.id = s.id_ct_mau_sac and si.id = s.id_size and g.trang_thai != 0 and g.id IN (SELECT sub.id from (select * from giay where ten_giay like '%${data.ten_giay}%'  LIMIT ? OFFSET ?)AS sub)`, [data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    pageSearchAll: (data, callBack) => {
        pool.query(
            `select * from giay WHERE ten_giay like '%${data.ten_giay}%'`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    getGiay: (callBack) => {
        pool.query(`select * from giay`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    newProduct: (callBack) => {
        pool.query(
            `select * from giay ORDER BY date_create DESC`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    newProducts: (callBack) => {
        pool.query(
            `select g.id as id_giay, g.ten_giay, g.gia_ban, g.gia_ban_goc, g.id_loai_giay, g.mo_ta, m.id, m.id_mau_sac, ms.ten_mau_sac, m.hinh_anh, s.id_size, si.ten_size, s.so_luong from giay as g, chi_tiet_mau_sac as m, chi_tiet_mau_sac_size as s, mau_sac as ms, size as si WHERE g.id = m.id_giay  and m.id_mau_sac = ms.id and  m.id = s.id_ct_mau_sac and si.id = s.id_size and g.trang_thai != 0 and g.id IN (SELECT sub.id from (select * from giay ORDER BY date_create DESC LIMIT 9)AS sub)`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    newProductsAll: (data, callBack) => {
        pool.query(
            `select g.id as id_giay, g.ten_giay, g.gia_ban, g.gia_ban_goc, g.id_loai_giay, g.mo_ta, m.id, m.id_mau_sac, ms.ten_mau_sac, m.hinh_anh, s.id_size, si.ten_size, s.so_luong from giay as g, chi_tiet_mau_sac as m, chi_tiet_mau_sac_size as s, mau_sac as ms, size as si WHERE g.id = m.id_giay  and m.id_mau_sac = ms.id and  m.id = s.id_ct_mau_sac and si.id = s.id_size and g.trang_thai != 0 and g.id IN (SELECT sub.id from (select * from giay where id_loai_giay = ? ORDER BY ${data.sortBy} ${data.groupBy} LIMIT ? OFFSET ?)AS sub)`, [data.id_loai_giay, data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    newProductsAllPage: (data, callBack) => {
        pool.query(
            `select * from giay where id_loai_giay = ? ORDER BY ${data.sortBy} ${data.groupBy} LIMIT ? OFFSET ?`, [data.id_loai_giay, data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    sanPhamMoi: (data, callBack) => {
        pool.query(
            `select g.id as id_giay, g.ten_giay, g.gia_ban, g.gia_ban_goc, g.id_loai_giay, g.mo_ta, m.id, m.id_mau_sac, ms.ten_mau_sac, m.hinh_anh, s.id_size, si.ten_size, s.so_luong from giay as g, chi_tiet_mau_sac as m, chi_tiet_mau_sac_size as s, mau_sac as ms, size as si WHERE g.id = m.id_giay  and m.id_mau_sac = ms.id and  m.id = s.id_ct_mau_sac and si.id = s.id_size and g.trang_thai != 0 and g.id IN (SELECT sub.id from (select * from giay ORDER BY ${data.sortBy} ${data.groupBy} LIMIT ? OFFSET ?)AS sub)`, [data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    sanPhamMoiPage: (data, callBack) => {
        pool.query(
            `select * from giay ORDER BY ${data.sortBy} ${data.groupBy} LIMIT ? OFFSET ?`, [data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    xemSanPhamAll: (data, callBack) => {
        pool.query(
            `select g.id as id_giay, g.ten_giay, g.gia_ban, g.gia_ban_goc, g.id_loai_giay, g.mo_ta, m.id, m.id_mau_sac, ms.ten_mau_sac, m.hinh_anh, s.id_size, si.ten_size, s.so_luong from giay as g, chi_tiet_mau_sac as m, chi_tiet_mau_sac_size as s, mau_sac as ms, size as si WHERE g.id = m.id_giay  and m.id_mau_sac = ms.id and  m.id = s.id_ct_mau_sac and si.id = s.id_size and g.trang_thai != 0 and g.id IN (SELECT sub.id from (select g.*, l.ten_loai_giay from giay as g, loai_giay as l where g.id_loai_giay = l.id and g.id = ?)AS sub)`, [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    xemSanPham: (data, callBack) => {
        pool.query(
            `select g.*, l.ten_loai_giay from giay as g, loai_giay as l where g.id_loai_giay = l.id and g.id = ?`, [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    productLG: (callBack) => {
        pool.query(
            `select g.id as id_giay, g.ten_giay, g.gia_ban, g.gia_ban_goc, g.id_loai_giay, g.mo_ta, m.id, m.id_mau_sac, ms.ten_mau_sac, m.hinh_anh, s.id_size, si.ten_size, s.so_luong from giay as g, chi_tiet_mau_sac as m, chi_tiet_mau_sac_size as s, mau_sac as ms, size as si WHERE g.id = m.id_giay  and m.id_mau_sac = ms.id and  m.id = s.id_ct_mau_sac and si.id = s.id_size and g.trang_thai != 0 and g.id IN (SELECT sub.id from (select * from giay )AS sub)`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    giayLG: (data, callBack) => {
        pool.query(
            `SELECT * from giay WHERE id_loai_giay = ?`, [data.id_loai_giay],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateGiay: (data, callBack) => {
        pool.query(
            `update giay set ten_giay=?, mo_ta=?,id_loai_giay=?, date_update=?, gia_ban=?, gia_ban_goc=?, trang_thai=?  where id = ?`, [
                data.ten_giay,
                data.mo_ta,
                data.id_loai_giay,
                data.date_update,
                data.gia_ban,
                data.gia_ban_goc,
                data.trang_thai,
                data.id_g,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteGiay: (data, callBack) => {
        pool.query(
            `DELETE FROM giay WHERE id = ?`, [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    SoLuongGiay: (callBack) => {
        pool.query(
            `SELECT g.*, m.hinh_anh from giay as g, chi_tiet_mau_sac_size as s, chi_tiet_mau_sac as m WHERE g.id = m.id_giay and m.id = s.id_ct_mau_sac and s.so_luong < 3 and g.trang_thai = 1 GROUP BY g.id`, [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};