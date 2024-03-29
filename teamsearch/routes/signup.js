const System = require("../index.js").System;
let router = require("express").Router();

router.get("/", (request, response) => {
	response.render("signup", {
			title: "  TeamSearch | Регистрация"
	});
});

router.post("/", function (request, response) {
	let errors = [];

	// validating

	if (request.body.email.trim() == "") errors.push("Введите email");
	if (request.body.login.trim() == "") errors.push("Введите login");
	if (request.body.password.trim() == "") errors.push("Введите пароль");
	if (request.body.password != request.body.passwordSecond) errors.push("Пароль не совпадает с подтверждением");
	if (sequelize.models.posts.findOne({ where: { 
		login: request.body.login,
		email: request.body.email
	 }}) != undefined) errors.push("Такой пользователь уже существует");

	if (errors.length != 0) { // if errors was found 
		response.send(errors[0]);
		response.set("Connection", "close"); // closing connection
	}

	System.bcrypt.hash(request.body.password, 10, (err, hash) => { //crypting user password
        	System.db.models.users.create({ // creating user
				email: request.body.email,
				login: request.body.login,
				password: hash // hash of password
		 	});
    	});

	response.render("signup", {
            title: "  TeamSearch | Успешная регистрация "
    });
});

module.exports = router;
