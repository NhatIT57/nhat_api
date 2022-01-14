require("dotenv").config();
import express, { json } from "express";
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