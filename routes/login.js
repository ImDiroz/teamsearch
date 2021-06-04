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

        bcrypt.compare(request.body.password, user.dataValues.password, (err, resultPass) => {
                if (resultPass) { // password is successfully compared and right
                        request.session.logged_user = user.dataValues; // save to session
                        return response.redirect("/profile");  // redirect to profile
                }
                return errors.push("Неверный логин или пароль!");
        });

        if (errors.length != 0) { // if errors was found 
		response.send(errors[0]);
		response.set("Connection", "close"); // closing connection
	}
});

module.exports = router;

