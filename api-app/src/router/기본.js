const express = require('express');
const router = express.Router();

// root: dashboard/ 
router.get('/', async function (req, res) {
	try {
		res.render('view에 있는 html 파일');
	} catch (error) {
		return(error)
	}
});

module.exports = router;