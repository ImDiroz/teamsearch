const System = require("../index.js").System;
let router = require("express").Router();

router.get("/", (request, response) => {
        response.render("index", {
                title: "TeamSearch | Главная"
        });
});


module.exports = router;
