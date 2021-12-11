const multer = require('multer');

module.exports = (multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, './public/Uploads')
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname)
		}
	}),
	fileFilter: (req, file, cb) => {
		const imageExtension = ['image/png', 'image/jpg', 'image/jpeg']
			.find(acceptExtension => acceptExtension === file.mimetype);

		if (imageExtension) {
			return cb(null, true);
		}

		return cb(null, false);
	}
}))