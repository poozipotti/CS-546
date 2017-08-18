"use strict"
const pallindromeRoutes = require("./pallindromes");

const constructorMethod = (app) => {
    app.use("/pallindromes", pallindromeRoutes);

    app.use("*", (req, res) => {
        res.redirect("/pallindromes");
    });

};

module.exports = constructorMethod;
