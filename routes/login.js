const System = require("../index.js").System;
let router = require("express").Router();

router.get("/", (request, response) => {
        response.render("login", {
               	title: "  TeamSearch | Авторизация "
        });
});

router.post("/", async (request, response) => {
        let errors = [];
	let user = await System.db.models.users.findOne({ where: { 
		login: request.body.login
	}});

        console.log(user);

        if (user == undefined) errors.push("Такого пользователя не существует!");

        // bcrypt.compare(request.body.password, user.password, (err, resultPass) => {

        // });
});

module.exports = router;

