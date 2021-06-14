const System = require("../index.js").System;
let router = require("express").Router();

router.use((request, response, next) => {
	if (request.session.logged_user) response.redirect("/profile"); // if logged in
	next();
});

router.get("/", (request, response) => {
	response.render("signup", {
			title: "TeamSearch | Регистрация"
	});
});

router.post("/", async (request, response) => {
	let errors = [];

	// validating

	let findUser = await System.db.models.users.findOne({ where: { 
		login: request.body.login,
		email: request.body.email
	}});

	if (request.body.email.trim() == "") errors.push("Введите email");
	if (request.body.login.trim() == "") errors.push("Введите login");
	if (request.body.password.trim() == "") errors.push("Введите пароль");
	if (request.body.password != request.body.passwordSecond) errors.push("Пароль не совпадает с подтверждением");
	if (findUser != undefined) errors.push("Такой пользователь уже существует");

	if (errors.length != 0) { // if errors was found 
		response.send(errors[0]);
		response.set("Connection", "close"); // closing connection
	}

	System.bcrypt.hash(request.body.password, 10, (err, hash) => { //crypting user password
        	System.db.models.users.create({ // creating user
				email: request.body.email,
				login: request.body.login,
				password: hash, // hash of password
				status: "",
				file: "./images/profile/avatar.png",
				description: "Нам не дали описание :("
		 	});
    	});

	response.render("signup", {
            title: "TeamSearch | Успешная регистрация"
    });
});

module.exports = router;
