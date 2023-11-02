const express = require('express');
const router = express.Router();
const axios = require('axios');

// root: dashboard/ 
router.get('/', async function (req, res) {
	let pnu = req.session.pnu;
	console.log(pnu);
	try {
		res.render('main/step0.html', {
			pnu : pnu,
			stdrYear : "2023"
		});
	} catch (error) {
		return(error)
	}
});
router.get('/dialog', async function (req, res) {
	try {
		res.render('main/dialog.html');
	} catch (error) {
		return(error)
	}
});
router.get('/test', async function (req, res) {
	try {
		res.render('main/test.html');
	} catch (error) {
		return(error)
	}
});
// root: dashboard/ 
router.get('/juso', async function (req, res) {
	try {
		res.render('main/juso.html');
	} catch (error) {
		return(error)
	}
});
router.get('/juso', async function (req, res) {
	try {
		res.render('view에 있는 html 파일');
	} catch (error) {
		return(error)
	}
});
router.get('/coordinate', async function (req, res) {
	try {
		res.render('main/coordinate.html');
	} catch (error) {
		return(error)
	}
});
router.get('/law', async function (req, res) {
	try {
		res.render('main/lawData.html');
	} catch (error) {
		return(error)
	}
});
router.get('/landType', async function (req, res) {
	try {
		res.render('main/landType.html');
	} catch (error) {
		return(error)
	}
});
router.get('/localDistrict', async function (req, res) {
	try {
		res.render('main/localDistrict.html');
	} catch (error) {
		return(error)
	}
});


module.exports = router;