require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import userRouter from "./api/nhan_vien/user.router";
import LoaiGiayRouter from "./api/loai_san_pham/loaigiay.router";
import UploadRouter from "./api/uploadImage/upload.router";
import giayRouter from "./api/san_pham/sanpham.router";
import mauSacRouter from "./api/mau_sac/sanpham.router";
import ctmauSacRouter from "./api/chi_tiet_mau_sac/sanpham.router";
import ctsizeRouter from "./api/size/sanpham.router";
import ctsizeMauSacRouter from "./api/chi_tiet_size/sanpham.router";
import khuyenMai from "./api/khuyen_mai/loaigiay.router";
import ctKhuyenMai from "./api/chi_tiet_khuyen_mai/sanpham.router";
import ctDonhang from "./api/chi_tiet_don_hang/loaigiay.router";
import khachhang from "./api/khach_hang/loaigiay.router";
import dathang from "./api/dat_hang/loaigiay.router";
import thongke from "./api/thong_ke/loaigiay.router";
const initRoutes = require('./api/xac_nhan_mail/router')


const router = express.Router()
const webSocketsServerPort = 8080;
const webSocketServer = require("websocket").server;
const http = require("http");
var cors = require("cors");
let app = express();
const clients = {};

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
global.__basedir = __dirname;
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
//config view engine
configViewEngine(app);

// init all web routes
initWebRoutes(app);

// //init cron job
// initCronJob();
//init all web routes
initWebRoutes(app);
initRoutes(app)
app.use("/api/users", userRouter);
app.use("/api/giay", giayRouter);
app.use("/api/mau_sac", mauSacRouter);
app.use("/api/chi_tiet_mau_sac", ctmauSacRouter);
app.use("/api/size", ctsizeRouter);
app.use("/api/chi_tiet_size", ctsizeMauSacRouter);
app.use("/api/loai_giay", LoaiGiayRouter);
app.use("/api/khuyen_mai", khuyenMai);
app.use("/api/chi_tiet_khuyen_mai", ctKhuyenMai);
app.use("/api/chi_tiet_don_hang", ctDonhang);
app.use("/api/khach_hang", khachhang);
app.use("/api/dat_hang", dathang);
app.use("/api/thong_ke", thongke);

router.post('/create_payment_url', function (req, res, next) {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

   
    var dateFormat = require('dateformat');

    
    var tmnCode = "1RXPXLQW";
    var secretKey = "MPFGXVLAQMXCMDPXLLEVDVAJIMMHQBWS";
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = "https://react-heroku-vo-bao.herokuapp.com/";

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl)
});


router.get('/vnpay_ipn', function (req, res, next) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var config = require('config');

    var tmnCode = "1RXPXLQW";
    var secretKey = "MPFGXVLAQMXCMDPXLLEVDVAJIMMHQBWS";
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = "https://react-heroku-vo-bao.herokuapp.com/";

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
     

    if(secureHash === signed){
        var orderId = vnp_Params['vnp_TxnRef'];
        var rspCode = vnp_Params['vnp_ResponseCode'];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({RspCode: '00', Message: 'success'})
    }
    else {
        res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
    }
});

router.get('/vnpay_return', function (req, res, next) {
    var vnp_Params = req.query;

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = "1RXPXLQW";
    var secretKey = "MPFGXVLAQMXCMDPXLLEVDVAJIMMHQBWS";
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = "https://react-heroku-vo-bao.herokuapp.com/";

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render('success', {code: vnp_Params['vnp_ResponseCode']})
    } else{
        res.render('success', {code: '97'})
    }
});




app.post("/api/notify", async(req, res) => {
    const data = req.body;
    clients["nhat"].sendUTF(
        JSON.stringify({
            type: "messages",
            msg: data,
        })
    );
});

const server = http.createServer(app);

const wsServer = new webSocketServer({
    httpServer: server,
});

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + s4() + "-" + s4();
};

wsServer.on("request", function(request) {
    var userID = getUniqueID();
    const connection = request.accept(null, request.origin);
    clients["nhat"] = connection;
});

UploadRouter(app);
let port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log("Ket noi 8080");
});