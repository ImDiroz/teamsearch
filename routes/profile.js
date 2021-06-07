const System = require("../index.js").System;
let router = require("express").Router();

router.use((request, response, next) => {
	if (!request.session.logged_user) response.redirect("/");
	next();
});

router.get("/", async (request, response) => {
	let posts = await System.db.models.posts.findAll({
		where: {
			user: request.session.logged_user.login
		}
	});
	response.render("profile", {
			title: "  TeamSearch | " + request.session.logged_user.login,
			session: request.session.logged_user,
			posts: posts
	});
});

module.exports = router;