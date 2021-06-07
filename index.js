const System = module.exports.System = require("./require.js");
const app = module.exports.app = System.app;

// server setup

System.Setup();
System.httpsRedirectInstall();

// handlebars setup

require("./handlebars.js").handlebarsCreateHelpers();
// routes   

app.use("/login", require("./routes/login.js")); 
app.use("/signup", require("./routes/signup.js")); 
app.use("/profile", require("./routes/profile.js")); 
app.use("/settings", require("./routes/settings.js")); 
app.use("/", require("./routes/index.js"));

System.https.createServer({
    key: System.fs.readFileSync("/etc/letsencrypt/live/teamsearch.ru/privkey.pem", "utf-8"), // путь к ключу
    cert: System.fs.readFileSync("/etc/letsencrypt/live/teamsearch.ru/fullchain.pem", "utf-8"), // путь к сертификат
}, app).listen(443); // server with ssl


console.log("started");
