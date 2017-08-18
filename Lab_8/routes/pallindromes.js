"use strict"
const express = require('express');
const router = express.Router();
const data = require('../data');
const pallindromeData = data.pallindromes;

router.get("/", (req, res) => {
    pallindromeData.getAllDocuments().then( (pallindromeList)=> {
            res.render("pallindromes/pallindrome",{body:pallindromeList.reverse()});
    }).catch((e)=>{
        console.log(e);
    });
});
router.get("/checked", (req, res) => {
    console.log("tried to render checked page")
    pallindromeData.getAllDocuments().then( (pallindromeList)=> {
            res.render("pallindromes/pallindromeChecked",{body:pallindromeList.reverse()});
    }).catch((e)=>{
        console.log(e);
    });
});

router.get("/json", (req, res) => {
    pallindromeData.getAllDocuments().then( (pallindromeList)=> {
        res.json(pallindromeList);
    });
});
router.get("/:id", (req, res) => {
    pallindromeData.getPallindromeById(req.params.id).then((pallindrome) => {
            res.json(pallindrome);
    }).catch( (e) => {
        console.log("tried to find pallindrome by id");
        console.log(e);
        res.status(404).json({error: "pallindrome not found"});
    });
});

router.post("/", (req, res) => {
    if(!req.body.pallindrome){
        console.log("tried to submit empty pallindrome");
        res.redirect("pallindromes/")
    }else{
        pallindromeData.addPallindrome(req.body).then((newPallindrome) => {
            console.log("redirected to checked")
            res.redirect("/pallindromes/checked");
        }).catch( (error) => {
            res.status(500).json({"error": e});
        });
    }
});
//i am pretty sure this isn't secure i just wanted a falisafe for myself with the password
router.delete("/all/:password", (req,res) => {
        if(req.params.password == 12345){
            pallindromeData.removeAllPallindromes().then( () => {
                    res.sendStatus(200);
            }).catch( (e) => {
                console.log(e);
                res.status(500).json({error: e});
            });
        }else{
            res.status(403).json("enter correct password after all");
        }
});
router.delete("/:id", (req,res) => {
    let getPallindrome = pallindromeData.getPallindromeById(req.params.id);
    getPallindrome.then( () => {
        return pallindromeData.removePallindrome(req.params.id) .then(() => {
            res.sendStatus(200);
        }).catch( (e) => {
            console.log(e);
            res.status(500).json({error: e});
        });
    }).catch((e) => {
        console.log(e);
        res.status(404).json({ error: "pallindrome not found"  });
    });
});

router.put("/:id", (req,res) => {
    pallindromeData.updatePallindrome(req.params.id,req.body).then((newPallindrome) => {
            res.json(newPallindrome);
    }).catch( (error) => {
        res.status(500).json({error: e});
    });
});
module.exports = router;




