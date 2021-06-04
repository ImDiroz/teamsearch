const System = require("../index.js").System;
let router = require("express").Router();

router.get("/", (request, response) => {
	if (request.session.logged_user) response.redirect("/profile"); // if logged in

	response.render("login", {
		title: "  TeamSearch | Авторизация "
	});
});

router.post("/", async (request, response) => {
	if (request.session.logged_user) response.redirect("/profile"); // if logged in

	let errors = [];
	let user = await System.db.models.users.findOne({ where: { 
		login: request.body.login
	}});

	if (user == undefined) {
		response.send("Такого пользователя не существует!");
		response.set("Connection", "close");
	}

	System.bcrypt.compare(request.body.password, user.dataValues.password, (err, resultPass) => {
		if (resultPass) { // password is successfully compared and right
			request.session.logged_user = user.dataValues; // save to session
			response.redirect("/profile");
		}

		else response.send("Неверный логин или пароль!");
	});

});

module.exports = router;

