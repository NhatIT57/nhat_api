var multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, __basedir + '/public/images');
	},
	filename: function (req, file, callback) {
		callback(null, Date.now() + path.extname(file.originalname));
	},
});

// const fileFilter = (req, file, callback) => {
//     if (file.mimeType === 'image/jpeg' || file.mimeType === 'image/png') {
//         callback(null, true);
//     } else {
//         callback(new Error('unsupported files'), false);
//     }
// };

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 10,
	},
	fileFilter: function (req, file, cb) {
		if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
			cb(null, true);
		} else {
			cb(null, false);
		}
	},
});

module.exports = {
	upload: upload,
};
