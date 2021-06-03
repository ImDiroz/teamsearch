const System = require("../index.js");
let router = require("express").Router();



router.get("/", (request, response) => {
        response.render("login", {
               	title: "  TeamSearch | Авторизация "
        });
});

router.post("/", (request, response) => {
	
});

module.exports = router;

