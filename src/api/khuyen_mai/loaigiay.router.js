const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
import * as controller from './loaiGiay.controller';
router.get('/', controller.getKhuyenMai);
router.post('/', controller.create);
router.post('/getKhuyenMaiNow', controller.getKhuyenMaiNow);
router.post('/getSanPhamKMNow', controller.getSanPhamKMNow);
router.get('/:id', controller.getById);
router.patch('/', controller.updateKhuyenMai);
router.post('/delete', controller.deleteKhuyenMai);

module.exports = router;