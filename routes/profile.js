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
	let user = request.session.logged_user;

	response.render("profile", {
			title: "  TeamSearch | " + user.login,
			session: user,
			status: user.status.split(),
			posts: posts
	});
});

module.exports = router;