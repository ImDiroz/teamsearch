const System = require("../index.js").System;
let router = require("express").Router();

router.use((request, response, next) => {
	if (!request.session.logged_user) response.redirect("/");
	next();
});


router.get("/", async (request, response) => {
    let posts = await System.db.models.posts.findAll();
    let vipPosts = await System.db.models.posts.findAll({
		where: {
			vip: true
		}
	});

    response.render("posts", {
        title: "Teamsearch | Посты",
        vipPosts: vipPosts,
        defaultPosts: posts
    });
});