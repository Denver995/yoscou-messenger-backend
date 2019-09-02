const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	//const token = req.headers.authorization.split(' ')[1];
	const token = req.header('auth-token');
	if (!token) res.status(401).send("Access Denied");
	try{
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		const userId = decodedToken.userId;
		if (req.user._id !== userId) {
			console.log(req.user._id, userId);
			res.send('Invalid Token');
		}else{
			console.log(req.user._id, userId);
			res.send('good Token');
			next();
		}
	}catch{
		
		res.status(401).send('bad request!');
	}
};