let Install = (app) => {
    // устанавливаем настройки для файлов layout
    app.engine("hbs", expressHbs({
            layoutsDir: "views/layouts", 
            defaultLayout: "layout",
            extname: "hbs"
        }
    ));
        
    app.set("view engine", "hbs");
}

module.exports.Install = Install;