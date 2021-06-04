const System = require("../index.js").System;
let router = require("express").Router();

router.get("/", (request, response) => {
	response.render("profile", {
			title: "  TeamSearch | " + request.session.logged_user.login,
            session: request.session.logged_user
	});
});

module.exports = router;