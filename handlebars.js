let Handlebars = require("index.js").System.hbs;

let handlebarsCreateHelpers = module.exports.handlebarsCreateHelpers = () => {
    Handlebars.registerHelper('ifeq', function (a, b, options) {
        if (a == b) { return options.fn(this); }
        return options.inverse(this);
    });

    Handlebars.registerHelper('ifnoteq', function (a, b, options) {
        if (a != b) { return options.fn(this); }
        return options.inverse(this);
    });
}
