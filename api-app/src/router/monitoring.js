const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validator } = require('../middleware/validator');
const checkLogin = require("../middleware/checkLogin");
const monitoring = require("../services/monitoring");
const MonitoringService = new monitoring();

// db데이터 조회할때 빅인트 처리
const bigintCheck = (result)=>{
	let keyss = Object.keys(result[0]);
	for (let i = 0; i < keyss.length; i++) {
		typeof result[0][keyss[i]] === 'bigint' ? result[0][keyss[i]] = Number(result[0][keyss[i]]) : ""
	}	
	return result;
}

// root: dashboard/ 
router.get('/', async function (req, res) {
	let powerPlantId = req.query.powerPlantFirstId;
	let powerPlantFirstId;
	let sn;

	try {
		if(powerPlantId != undefined){
			// 사용자가 선택한 발전소에 있는 인버터의 SN구하기
			powerPlantFirstId = powerPlantId;
			sn = await MonitoringService.getPowerPlantFirstId_IvtSn(powerPlantFirstId);

		}else {
			// 최초 로그인시 로그인한 유저의 첫번째 발전소의 인버터 SN 조회 하기
			let userPowerplant = req.session.userPowerPlantInfo;
			powerPlantFirstId = userPowerplant[0].powerplantId;
			sn = await MonitoringService.getPowerPlantFirstId_IvtSn(powerPlantFirstId);
		}

		req.session.sn = sn;
		req.session.selectPowerPlantId = powerPlantFirstId;
		res.render('monitoring', {
			loginInfo: req.session.loginInfo,
			ivt_sn : req.session.sn
		});
		
	} catch (error) {
		return(error)
	}

	
});

// sample
router.get('/siteinfo', [
	body('name').trim().isLength({ min: 2 }).withMessage('이름은 두글자 이상!'),
	validator,
], async (req, res) => {

	try {
		const result = await MonitoringService.getMonitoringInfo(req.body);
		return res.json(result);
	} catch (error) {
		// return error;
	}
});

// 날씨 데이터 조회
router.get('/monitoringWeather',[validator], async (req, res) => {
	const operationstatusInfoDto = { // DTO 만들어서 파라미터로 넘겨주기
		userPowerplantSn : req.session.sn,
		userPowerplant : req.session.selectPowerPlantId,
	}

	let userPowerplant = req.session.selectPowerPlantId;
	try {
		const result = await MonitoringService.getWeather(userPowerplant);

		if(result[0] == undefined){
			return res.json("0");
		}

		await bigintCheck(result);	

		return res.json(result[0]);
	} catch (error) {
		return error;
	}
});


module.exports = router;