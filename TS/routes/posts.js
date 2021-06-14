const System = require("../index.js").System;
let router = require("express").Router();

router.use((request, response, next) => {
	if (!request.session.logged_user) response.redirect("/");
	next();
});


router.get("/", async (request, response) => {
    let posts = await System.db.models.posts.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
    let vipPosts = await System.db.models.posts.findAll({
		where: {
			vip: true
		},
        order: [
            ['id', 'DESC']
        ]
	});

    response.render("posts", {
        title: "Teamsearch | Посты",
        vipPosts: vipPosts,
        defaultPosts: posts
    });
});

router.post("/create", async (request, response) => {
    let errors = [];
    let user = request.session.logged_user;

    if (request.body.game == "not selected") {
        if (request.body.othergame.trim() == "") errors.push("Введите название игры!");
        else game = request.body.othergame;
    }
    else game = request.body.game;

    if (request.body.discord.trim() == "") errors.push("Введите дискорд!");
    if (request.body.content.trim() == "") errors.push("Введите описание!");
    if (request.body.vip) {
        if (user.status.search("c") == -1) errors.push("У вас нет випа");
    }

    if (errors.length != 0) {
        response.send(errors[0]);
        response.end();
    }

    await System.db.models.posts.create({
        user: user.login,
        vip: request.body.vip,
        game: game,
        name: user.login,
        content: request.body.content
    });

    response.redirect("/posts");
});

module.exports = router;