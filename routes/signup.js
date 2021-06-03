const System = require("../index.js").System;
let router = require("express").Router();

router.get("/", (request, response) => {
        response.render("signup", {
                title: "  TeamSearch | Регистрация"
        });
});

router.post("/", function (request, response) {
	console.log(request.body);
	if (request.body.email.trim() == "") response.set("Connection", "close");
	if (request.body.login.trim() == "") response.set("Connection", "close");
	if (request.body.password.trim() == "") response.set("Connection", "close");
	if (request.body.password != request.body.passwordSecond) response.set("Connection", "close");

	System.bcrypt.hash(request.body.password, 10, (err, hash) => {
        	 System.db.models.users.create({
			email: request.body.email,
			login: request.body.login,
			password: request.body.password
		 });
    	});

	response.render("signup", {
                title: "  TeamSearch | Успешная регистрация "
        });
});

module.exports = router;
