"use strict"
const express = require('express');
const router = express.Router();
const data = require('../data');
const structureData = data.structures;
const entryData = data.entries;

router.get("/new", (req, res) => {
	res.render("admin/newStructure",{});
});
router.get("/structures/:slug/new", (req, res) => {
    structureData.getStructureBySlug(req.params.slug).then( (structure)=> {
        res.render("admin/newEntry", {body:structure});
    }).catch( (e) => {
	res.redirect("structures");
	console.log(e);	
    });
});
router.get("/removeAll", (req, res) => {
	structureData.removeAll().then( (removeData) => {
		console.log("cleared db");
		res.redirect("new");
	}).catch( (e) => {
		console.log("failed to clear db");
		res.redirect("new");
	});
});
router.get("/structures/JSON", (req,res) => {
    structureData.getAllStructures().then( (structureList)=> {
        res.json(structureList);
    }).catch( (e) => {
	res.redirect("/new");
	console.log(e);	
    });
});
router.get("/structures", (req,res) => {
    structureData.getAllStructures().then( (structureList)=> {
        res.render("admin/structures", {body:structureList});
    }).catch( (e) => {
	res.redirect("structures");
	console.log(e);	
    });
});
router.get("/structures/:slug", (req,res) => {
    structureData.getStructureBySlug(req.params.slug).then( (structure)=> {
        res.render("admin/structures", {body:[structure]});
    }).catch( (e) => {
	res.redirect("structures");
	console.log(e);	
    });
});
router.get("/structures/:slug/list", (req,res) => {
    entryData.getEntriesByStructureSlug(req.params.slug).then( (entryList)=> {
	console.log(entryList);
        res.render("admin/entries", {body:entryList});
    }).catch( (e) => {
	res.redirect("structures");
	console.log(e);	
    });
});
router.get("/structures/:slug/JSON", (req,res) => {
    structureData.getStructureBySlug(req.params.slug).then( (structure)=> {
        res.json(structure);
    }).catch( (e) => {
	alert(e);	
	res.redirect("structures");
    });
});
router.delete("/structures/:id", (req,res) => {
    structureData.removeStructure(req.params.id).then( (structureList)=> {
		res.json({"success" : true});
	}).catch( (e) => {
		console.log(e);
		res.json({"success" : false});
	});
});
router.post("/new", (req,res) => {
    structureData.addStructure(req.body).then( (structureList)=> {
		res.json({"success" : true});
	}).catch( (e) => {
		console.log(e);
		res.json({"success" : false});
	});
});
router.post("/structures/:slug/new", (req,res) => {
	var test = entryData.addEntry(req.body,req.params.slug);
	console.log(test);
	test.then( (data) => {
		console.log(data);
		console.log(req.body);
		console.log(req.params.slug);
	});
});
router.put("/structures/:id", (req,res) => {
    structureData.updateStructure(req.params.id,req.body).then( (structureList)=> {
		res.json({"success" : true});
	}).catch( (e) => {
		console.log(e);
		res.json({"success" : false});
	});
});

module.exports = router;
