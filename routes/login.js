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

        if (user == undefined) errors.push("Такого пользователя не существует!");

        console.log("a");

        System.bcrypt.compare(request.body.password, user.dataValues.password, (err, resultPass) => {
                console.log("b");
                if (resultPass) { // password is successfully compared and right
                        console.log("d");
                        request.session.logged_user = user.dataValues; // save to session
                        response.render("login", {
                                title: "  TeamSearch | Авторизация "
                        });
                }
                console.log("h");
                return errors.push("Неверный логин или пароль!");
        });

        if (errors.length != 0) { // if errors was found 
		response.send(errors[0]);
		response.set("Connection", "close"); // closing connection
	}
});

module.exports = router;

