import express from 'express';

import sql from './../sql/sql';

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/api/nhan-vien', sql.danhsachLogin);
    router.get('/', sql.danhsachLogin);
    router.get('/logout', (req, res) => {
        req.session.destroy();
        req.logout();
        res.status(200).json({ err: null, authUser: {} });
    });
    return app.use('/', router);
};

module.exports = initWebRouter;