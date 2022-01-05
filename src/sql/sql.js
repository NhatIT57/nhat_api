const mysql = require('mysql');

const con = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bf0844fbd86225',
    password: '71b99177238a174',
    database: 'heroku_b938c71e4878655',
});

let danhsachLogin = (req, res) => {
    var sql = 'SELECT * FROM nhan_vien';
    con.query(sql, function(err, results) {
        if (err) throw err;
        else {
            // nhommonan = JSON.stringify({ monan: results });
            res.json({ nhan_vien: results });
        }
    });
};

let Login = (req, res) => {
    res.send({
        token: 'test123',
    });
};

module.exports = {
    danhsachLogin: danhsachLogin,
    Login: Login,
};