"use strict"
const mongoCollections = require("../config/mongoCollections");
const entries = mongoCollections.entries;
const uuid = require('uuid');
const structureData = require("./structures");

let exportedMethods = {
    getAllEntries() {
        return entries().then( (entryCollection) => {
            return entryCollection
            .find({})
            .toArray();
        });

    },
    getEntry(id) {
        return entries().then((entryCollection) => {
            return entryCollection
            .findOne({_id : id})
            .then( (entry) => {
                if(!entry){
                    throw "entry not found"
                }
                return entry;
            });
        });

    },
    getEntry(slug) {
        return entries().then((entryCollection) => {
            return entryCollection
            .findOne({slug : slug})
            .then( (entry) => {
                if(!entry){
                    throw "entry not found"
                }
                return entry;
            });
        });

    },
    getEntriesByStructureSlug(slug) {
        return entries().then((entryCollection) => {
            return entryCollection
            .find({structureSlug : slug})
	    .toArray();
    	});
    },
    addEntry(structureSlug,entry){
		if(!entry ){
			return Promise.reject("please provide a entry")
		}
		Promise.reject("this is a test im going crazy");
   },
    removeAll(){
        return entries().then((entryCollection) => {
            return entryCollection
            .deleteMany({});
        });
    },
    removeStructure(id){
        return entries().then((entryCollection) => {
            return entryCollection
            .removeOne({_id: id}).then( (entry) => {
                if(!entry){
                    console.log("pallindrome not found");
                    throw "pallindrome not found"
                }
                return entry;
            }).catch((e)=>{
                 console.log(e);
            });
        });
    },
    updateStructure(id,entry){
        return entries().then((entryCollection) => {
            if(entry){
                console.log(id);
                entryCollection.updateOne({_id:id},{
                    $set:{
			title: entry.title,
			blurb: entry.blurb,
			type: entry.type,
			fields: entry.fields,
			date: new Date()
		    }
                });
            }
        })
    }
}
console.log(exportedMethods);
module.exports = exportedMethods;
