const pool = require('../../config/database');

module.exports = {
    // create: (data, callBack) => {
    //     pool.query(
    //         `insert into tinh_thanh_pho( username, password, ten_nhan_vien, sdt, gioi_tinh, dia_chi, email) values (?,?,?,?,?,?,?)`, [data.username, data.password, data.ten_nhan_vien, data.sdt, data.gioi_tinh, data.dia_chi, data.email],
    //         (error, results, fields) => {
    //             if (error) {
    //                 console.log(error);
    //                 callBack(error);
    //             }

    //             return callBack(null, results);
    //         }
    //     );
    // },
    getUserByUserId: (id, callBack) => {
        pool.query(`select * from tinh_thanh_pho where matp = ?`, [matp], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getUsers: (callBack) => {
        pool.query(`select * from tinh_thanh_pho`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    page: (data, callBack) => {
        pool.query(`select * from tinh_thanh_pho limit ? offset ?`, [data.limit, data.offset], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },


    pageSearch: (data, callBack) => {
        if (data.name !== "") {
            pool.query(
                `select * from tinh_thanh_pho WHERE name like '%${data.name}%' limit ? offset ?`, [data.limit, data.offset],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }

                    return callBack(null, results);
                }
            );
        } else {
            pool.query(
                `select * from tinh_thanh_pho limit ? offset ?`, [data.limit, data.offset],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }

                    return callBack(null, results);
                }
            );
        }
    },

    pageSearchTotal: ( callBack) => {
        pool.query(
            `SELECT count(*) as total from (select * from tinh_thanh_pho WHERE name like '%Bình ĐỊnh%' ) as Z`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    pageTotal: (callBack) => {
        pool.query(
            `SELECT count(*) as total from (select * from tinh_thanh_pho) as Z`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },


    updateUser: (data, callBack) => {
        pool.query(
            `update tinh_thanh_pho set ship=? where matp = '${data.matp}'`, [
                data.ship,
   
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(`DELETE FROM tinh_thanh_pho WHERE matp = ?`, [data.matp], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
};