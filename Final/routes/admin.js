"use strict"
const express = require('express');
const router = express.Router();

router.get("/new", (req, res) => {
	res.render("admin/newStructure",{});
});

module.exports = router;
