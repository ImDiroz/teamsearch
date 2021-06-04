const System = require("../index.js").System;
let router = require("express").Router();

router.use((request, response, next) => {
	if (!request.session.logged_user) response.redirect("/");
	next();
});

router.get("/", (request, response) => {
	response.render("settings", {
			title: "  TeamSearch | " + request.session.logged_user.login,
            session: request.session.logged_user
	});
});

router.post("/", async (request, response) => {
    // ------------ files update ------------
    let mimeTypes = ["image/gif", "image/jpeg", "image/pjpeg", "image/png", "image/tiff", "image/vnd.microsoft.icon", "image/webp"];
    let path = `${request.session.logged_user.login}${request.files.avatarFile.name}`;
    if (mimeTypes.indexOf(request.files.avatarFile.mimetype) != -1) request.files.avatarFile.mv("/static/user/" + path, (error) => {
        if (error) response.send("Files move error<br>");
    });
    // -------------  update   ----------
    
    await sequelize.models.comments.update({ 
            login: request.body.nickname,
            description: request.body.description,
            file: "./user/" + path
        }, {
            where: { id: request.session.logged_user.id } 
    });


    response.render("settings", {
        title: "  TeamSearch | " + request.session.logged_user.login,
        session: request.session.logged_user
    });
});

module.exports = router;