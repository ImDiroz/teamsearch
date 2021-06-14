const express = module.exports.express = require("express");
const expressHbs = module.exports.expressHbs = require("express-handlebars");
const hbs = module.exports.hbs = require("hbs");
const app = module.exports.app = express();
const path = module.exports.path = require('path');
const bodyParser = module.exports.bodyParser = require("body-parser");
const bcrypt = module.exports.bcrypt = require('bcrypt');
const db = module.exports.db = require("./db.js");
const https = module.exports.https = require("https");
const fs = module.exports.fs = require("fs");
var session = module.exports.session = require('express-session');

//  setting up
let Setup = module.exports.Setup = () => {
	// устанавливаем настройки для файлов layout
	console.log("Express handlebars");

	app.engine("hbs", expressHbs({
				layoutsDir: "views/layouts",
				defaultLayout: "layout",
				extname: "hbs"
			}
	));
	app.set("view engine", "hbs");
	
	console.log("Static folder");

	const publicPath = path.join(__dirname, "static");
	app.use(express.static(publicPath));
	
	console.log("Body parser");

	app.use(bodyParser.urlencoded({extended: true}));

	console.log("Sessions");

	app.use(session({
		secret: 'key',
		saveUninitialized: true,
		resave: false,
	}));

	//Security
	
	app.use(require('helmet')());
}

let httpsRedirectInstall = module.exports.httpsRedirectInstall = () => {
	app.enable('trust proxy')
	app.use((request, response, next) => {
		request.secure ? next() : response.redirect('https://' + request.headers.host + request.url)
	})
};
