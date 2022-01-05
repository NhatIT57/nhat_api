const express = require('express');
const router = express.Router();
const upload_controler = require('./upload.controler');
const uploadMutiple_controler = require('./uploadMultiple.controller');
const upload = require('./upload');
const uploadMultiple = require('./uploadMultiple');

let routes = (app) => {
    router.post('/api/upload', upload.upload.single('image'), upload_controler.upload);
    router.get('/images/:image_name', (req, res) => {
        imagemodel
            .find({ name: req.params.image_name }, { image_path: 1, _id: 0 })
            .limit(1)
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: err.message });
                }

                if (docs.length === 0) {
                    return res.status(404).json({ message: 'No such image file' });
                }

                const imagePath = path.join(__dirname, docs[0].image_path);
                try {
                    const buffer = fs.readFileSync(imagePath);
                    const mime = fileType(buffer).mime;
                    res.writeHead(200, { 'Content-Type': mime });
                    res.end(buffer, 'binary');
                } catch (error) {
                    console.log(error.code);
                    if (error.code === 'ENOENT') {
                        res.status(404).json({ message: 'No such image file' });
                    } else {
                        res.status(500).json({ message: error.message });
                    }
                }
            });
    });
    router.post('/api/multiple', uploadMutiple_controler.multipleUpload);
    router.get('/photo/:id', (req, res) => {
        var filename = req.params.id;

        db.collection('mycollection').findOne({ _id: ObjectId(filename) }, (err, result) => {
            if (err) return console.log(err);

            res.contentType('image/jpeg');
            res.send(result.image.buffer);
        });
    });
    app.use(router);
};

module.exports = routes;