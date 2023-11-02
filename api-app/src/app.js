// Module dependencies.
const express = require('express'),
	session = require('express-session'),
	MemoryStore = require('memorystore')(session),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	flash = require('connect-flash'),
	path = require('path'),
	ejs = require('ejs'),
	// pool = require("./loaders/db"),
	properties = require("./config/properties"),
	{ logger } = require("./config/winston"),
	morgan = require('morgan'),
	// user = require("./router/login"),
	checkPageAuth = require("./middleware/checkPageAuth"),
	convert = require('xml-js');;

// All environments
const app = express()
	.set('views', path.join(__dirname, 'webapp/views'))
	// .set('view engine', 'ejs')
	.engine('html', require('ejs').renderFile)
	.set('view engine', 'html')
	.use(express.static(__dirname + '/webapp/public'))
	.use('/jquery', express.static(__dirname + '/../node_modules/jquery/dist'))
	// .use('/jquery-ui', express.static(__dirname + '/../node_modules/jquery-ui/dist'))
	.use('/axios', express.static(__dirname + '/../node_modules/axios/dist'))
	// .use('/datetimepicker', express.static(__dirname + '/../node_modules/jquery-datetimepicker'))
	.use('/chartJs', express.static(__dirname + '/../node_modules/chart.js/dist'))
	.use('/moment', express.static(__dirname + '/../node_modules/moment/min'))
	// .use('/bootstrap-icons', express.static(__dirname + '/../node_modules/bootstrap-icons/font'))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(methodOverride('_method'))
	.use(flash())
	.use(session({
		key : 'greenfesco-secret-key-7592', 
		secret: 'greenfesco-secret-key',
		resave: false,
		saveUninitialized: true,
		store: new MemoryStore({ checkPeriod: properties.session_time }),
		cookie: {
			//   maxAge:  properties.cookie_time,
		}
	}));

// Routes
// write logger files
if (properties.env !== "prod") app.use(morgan("tiny", {
	skip: (req, res) => {
		if (req.url.indexOf("/imgs")) return false;
		if (req.url.indexOf("/css")) return false;
		if (req.url.indexOf("/js")) return false;
		if (req.url.indexOf("/plugin")) return false;
		if (req.url.indexOf("/fonts")) return false;
		if (req.url.indexOf("/ct_js")) return false;
		return true;
	},
	stream: logger.stream
}));

// const schedule = require('node-schedule');
// const checkLogin = require('./middleware/checkLogin');
// const cmn_api = require("./router/cmnApiAction");
// const job = schedule.scheduleJob('50 * * * *', function () {
// 	//cmn_api.getWeatherInfoByCmnApi();
// });

// const cron = require('node-cron');
// 초 분 시
// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *
// smp 데이터는 매일

// cron.schedule('20 10 1 * * *', () => {Api2Router.getSmpApi(); });



// 미들웨어 공통정보
app.use(function (req, res, next) {
	// res.locals.loginInfo = req.session.loginInfo;
	// res.locals.menulist = req.session.menulist;
	// res.locals.acesslist = req.session.acesslist;
	req.session.pnu = "4681025022101700001";
	next();
});

// app.use('/', require("./router/login"));
// 로그인 인증
// app.use('/', checkLogin);
app.use('/', require('./router/pageRouter')); // 페이지 라우터
app.use('/jusoAPI', require('./router/jusoAPI')); // 기타등등
app.use('/lawAPI', require('./router/lawAPI')); // 조례
app.use('/landType', require('./router/landType')); // 토지유형
app.use('/localDistrict', require('./router/localDistrict')); // 지역지구 분석
// app.use('/publicDataApi', require('./router/publicDataApi')); // REST_API 조회 모음

/*


// 404 page 처리
app.all('*', function (req, res) {
	res.render('errors/notFound', {
		msg: "죄송합니다. 관리자에게 문의하여 주시기 바랍니다."
	});
});

// Error Handling
app.use((err, req, res, next) => {
	logger.log(err.stack)
	res.render('errors/notFound', {
		msg: "죄송합니다. 관리자에게 문의하여 주시기 바랍니다."
	});
});

app.use((err, req, res, next) => {
	logger.error(err.stack);
	res.render('errors/serverError', {
		msg: "죄송합니다. 관리자에게 문의하여 주시기 바랍니다."
	});
});

app.use((err, req, res, next) => {
	logger.error(err.stack);
	if (res.status() != 200) {
		res.render('errors/serverError', {
			msg: "죄송합니다. 관리자에게 문의하여 주시기 바랍니다."
		});
	}
});

*/

app.listen(properties.server_port, () => logger.info('greenfesco server on!' + " http://" + properties.server_ip + ":" + properties.server_port));
