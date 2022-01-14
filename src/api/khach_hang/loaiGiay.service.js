const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into khach_hang(facebook_id, email, ho_khach_hang, password, phone, avatar, ten_khach_hang, accessToken) values (?,?,?,?,?,?,?,?)`,
      [
        data.facebook_id,
        data.email,
        data.ho_khach_hang,
        data.password,
        data.phone,
        data.avatar,
        data.ten_khach_hang,
        data.accessToken,
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

  createAcount: (data, callBack) => {
    pool.query(
      `insert into khach_hang(email, ho_khach_hang, password, phone, ten_khach_hang) values (?,?,?,?,?)`,
      [
        data.email,
        data.ho_khach_hang,
        data.password,
        data.phone,
        data.ten_khach_hang,
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

  getById: (body, callBack) => {
    pool.query(
      `select * from khach_hang where id = ?`,
      [body.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getAll: (callBack) => {
    pool.query(`select * from khach_hang`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },
  getFBID: (data, callBack) => {
    pool.query(
      `select * from khach_hang where facebook_id = ? `,
      [data.facebook_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getEmail: (data, callBack) => {
    pool.query(
      `select * from khach_hang where email = ? `,
      [data.email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  update: (data, callBack) => {
    pool.query(
      `update khach_hang set facebook_id=?, email=?, password = ?, ten_khach_hang = ?, ho_khach_hang = ? where id = ?`,
      [
        data.facebook_id,
        data.email,
        data.password,
        data.ten_khach_hang,
        data.ho_khach_hang,
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
  updateaccessToken: (data, callBack) => {
    pool.query(
      `update khach_hang set accessToken=? where id = ?`,
      [data.accessToken, data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  page: (data, callBack) => {
    if (data.search && !data.start_date) {
      pool.query(
        `select * from khach_hang where ten_khach_hang like '%${data.search}%' limit 6 offset ?`,
        [data.offset],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    } else if (!data.search && data.start_date) {
      pool.query(
        `select * from khach_hang where thoigian BETWEEN '${data.start_date}' AND '${data.end_date}' limit 6 offset ?`,
        [data.offset],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    } else if (data.search && data.start_date) {
      pool.query(
        `select * from khach_hang where ten like '%${data.search}%' and thoigian BETWEEN '${data.start_date}' AND '${data.end_date}' limit 6 offset ?`,
        [data.offset],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    } else {
      pool.query(
        `select * from khach_hang limit 6 offset ?`,
        [data.offset],
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
    pool.query(
      `select * from khach_hang where ten_khach_hang like '%${data.search}%'`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  delete: (data, callBack) => {
    pool.query(
      `DELETE FROM khach_hang WHERE id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
