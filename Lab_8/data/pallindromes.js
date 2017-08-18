"use strict"
const mongoCollections = require("../config/mongoCollections");
const pallindromes = mongoCollections.pallindromes;
const uuid = require('uuid');

let exportedMethods = {
    getAllPallindromes() {
        return pallindromes().then((pallindromeCollection) => {
            return pallindromeCollection
            .find({"isPallindrome":true})
            .toArray();
        });

    },
    getAllNonPallindromes() {
        return pallindromes().then((pallindromeCollection) => {
            return pallindromeCollection
            .find({"isPallindrome":false})
            .toArray();
        });

    },
    getAllDocuments() {
        return pallindromes().then((pallindromeCollection) => {
            return pallindromeCollection
            .find({})
            .toArray();
        });

    },
    getPallindromeById(id) {
        return pallindromes().then((pallindromeCollection) => {
            return pallindromeCollection
            .findOne({_id : id})
            .then( (pallindrome) => {
                if(!pallindrome){
                    throw "pallindrome not found"
                }
                return pallindrome;
            });
        });

    },
    addPallindrome(pallindrome){
        if(!pallindrome ){
            return Promise.reject("please provide a pallindrome")
        }
        return pallindromes().then( (pallindromeCollection) => {
            let pallindromeString = pallindrome.pallindrome;
            let isPallindrome = true;
            pallindromeString = pallindromeString.toLowerCase();
            pallindromeString = pallindromeString.replace(/[.,!\"#!@\s?\'\"]/g,"");
            for(let i =0; i<pallindromeString.length; i++){
                if(pallindromeString.charAt(pallindromeString.length-1-i) != pallindromeString.charAt(i)){
                    isPallindrome = false;
                    break;
                }
            }
            let newPallindrome = {
                "_id": uuid.v4(),
                "pallindrome" : pallindrome.pallindrome,
                "strippedtext": pallindromeString,
                "isPallindrome" : isPallindrome

            };
            return pallindromeCollection
            .insertOne(newPallindrome).then( (newInsertInformation) =>{
                return newInsertInformation.insertId;
            });
        }).catch((e)=>{
             console.log(e);
        });
    },
    removeAllPallindromes(){
        return pallindromes().then((pallindromeCollection) => {
            return pallindromeCollection
            .deleteMany({});
        });
    },
    removePallindrome(id){
        return pallindromes().then((pallindromeCollection) => {
            return pallindromeCollection
            .removeOne({_id: id}).then( (pallindrome) => {
                if(!pallindrome){
                    console.log("pallindrome not found");
                    throw "pallindrome not found"
                }
                return pallindrome;
            }).catch((e)=>{
                 console.log(e);
            });
        });
    },
    updatePallindrome(id,pallindrome){
        return pallindromes().then((pallindromeCollection) => {
            if(pallindrome){
                console.log(id);
                pallindromeCollection.updateOne({_id:id},{
                    $set:{pallindrome: pallindrome.pallindrome}
                });
            }
        })
    }
}

module.exports = exportedMethods;
