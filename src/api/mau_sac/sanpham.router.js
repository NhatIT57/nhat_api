const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
import * as mauSac from './sanpham.controller';
router.get('/', mauSac.getAll);
router.get('/page', mauSac.page);
router.post('/', mauSac.create);
router.get('/:id', mauSac.getById);
router.post('/ten_giay', mauSac.getBy);
router.patch('/', mauSac.update);
router.post('/delete', mauSac.delete);

module.exports = router;