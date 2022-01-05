const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
import * as controller from './loaiGiay.controller';
router.get('/', controller.getAll);
router.post('/', controller.create);
// router.get('/:id', controller.getLoaiGiayByid);
router.patch('/', controller.update);
router.post('/delete', controller.delete);

module.exports = router;