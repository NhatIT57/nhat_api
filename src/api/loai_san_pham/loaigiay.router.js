const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
import * as controller from './loaiGiay.controller';
router.get('/', controller.getLoaiGiay);
router.get('/getTC', controller.getLoaiGiayTC);
router.post('/', controller.createLoaiGiay);
router.get('/:id', controller.getLoaiGiayByid);
router.patch('/', controller.updateLoaiGiay);
router.post('/delete', controller.deleteLoaiGiay);

module.exports = router;