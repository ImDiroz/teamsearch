const System = module.exports.System = require("./require.js");
const app = module.exports.app = System.app;
System.Setup();
// routes

app.use("/login", require("./routes/login.js")); 
app.use("/signup", require("./routes/signup.js")); 
app.use("/profile", require("./routes/profile.js")); 
app.use("/settings", require("./routes/settings.js")); 
app.use("/", require("./routes/index.js"));

app.listen(80);

console.log("started");
