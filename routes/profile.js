const System = require("../index.js").System;
let router = require("express").Router();

router.use((request, response, next) => {
	if (!request.session.logged_user) response.redirect("/");
	next();
});

router.get("/", (request, response) => {
	response.render("profile", {
			title: "  TeamSearch | " + request.session.logged_user.login,
            session: request.session.logged_user
	});
});

module.exports = router;