cons multer = require('multer');

const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/png': 'png',
	'image/jpeg': 'jpg',
}

const storage = multer.diskStorage({
	destination: (req, file, callBack) => {
		callBack(null, 'images');
	},
	
	filename: (req, file, callBack) => {
		const name = file.originalename.split(' ').join('_');
		const extension = MIME_TYPES[file.mimetype];
		callBack(null, name + Date.now() + '.' + extension);
	} 
});

module.exports = multer({storage: storage}).single('image');