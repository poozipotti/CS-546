"use strict"
const adminRoutes = require("./admin");

const constructorMethod = (app) => {
    app.use("/admin", adminRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });

};

module.exports = constructorMethod;
