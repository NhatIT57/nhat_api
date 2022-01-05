const path = require('path');
const fs = require('fs');
const baseUrl = 'http://localhost:8080/';

function upload(req, res) {
	console.log(req.file);
	if (req.file.filename) {
		res.status(201).json({
			message: 'Image upload seccessfilly',
			url: req.file.filename,
		});
	} else {
		res.status(500).json({
			message: 'Something went wrong!',
		});
	}
}

function getListFiles(req, res) {
	const directoryPath = __basedir + '/public/images';

	fs.readdir(directoryPath, function (err, files) {
		if (err) {
			res.status(500).send({
				message: 'Unable to scan files!',
			});
		}

		let fileInfos = [];

		files.forEach((file) => {
			fileInfos.push({
				name: file,
				url: baseUrl + file,
			});
		});

		res.status(200).send(fileInfos);
	});
}

module.exports = {
	upload,
	getListFiles,
};
