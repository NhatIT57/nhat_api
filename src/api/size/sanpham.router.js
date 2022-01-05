const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
import * as mauSac from './sanpham.controller';
router.get('/', checkToken, mauSac.getAll);
router.get('/page', checkToken, mauSac.page);
router.post('/', checkToken, mauSac.create);
router.get('/:id', checkToken, mauSac.getById);
router.post('/ten_giay', checkToken, mauSac.getBy);
router.patch('/', checkToken, mauSac.update);
router.post('/delete', checkToken, mauSac.delete);

module.exports = router;