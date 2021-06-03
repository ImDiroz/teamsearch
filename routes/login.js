const System = require("../index.js").System;
let router = require("express").Router();

router.get("/", (request, response) => {
        response.render("login", {
               	title: "  TeamSearch | Авторизация "
        });
});

router.post("/", (request, response) => {
        let errors = [];
	let user = System.db.models.users.findOne({ where: { 
		email: request.body.email
	}});

        console.log(user);

        if (user == undefined) errors.push("Такого пользователя не существует!");

        // bcrypt.compare(request.body.password, user.password, (err, resultPass) => {

        // });
});

module.exports = router;

