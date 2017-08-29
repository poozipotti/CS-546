"use strict"
const mongoCollections = require("../config/mongoCollections");
const structures = mongoCollections.structures;
const uuid = require('uuid');
const entryData = require("./entries");

let exportedMethods = {
    getAllStructures() {
        return structures().then( (structureCollection) => {
            return structureCollection
            .find({})
            .toArray();
        });

    },
    getStructureById(id) {
        return structures().then((structureCollection) => {
            return structureCollection
            .findOne({_id : id})
            .then( (structure) => {
                if(!structure){
                    Promise.reject( "structure not found");
                }
                return structure;
            });
        });

    },
    getStructureBySlug(slug) {
        return structures().then((structureCollection) => {
            return structureCollection
            .findOne({slug : slug})
            .then( (structure) => {
                if(!structure){
                    Promise.reject( "structure not found");
                }
                return structure;
            });
        });

    },
	addStructure(structure){
		if(!structure ){
			return Promise.reject("please provide a structure")
		}
		return structures().then( (structureCollection) => {
			let titles = structureCollection.find({title:structure.title}).toArray();
			titles.then( (sameTitles) => {
				let temp = sameTitles.length;
				let slug = structure.title + "_" + temp;
				let slugUnique = false;
				let recursiveLoop = (aSlug) => {
					return structureCollection.findOne({slug:aSlug}).then( (sameSlugStructure) => {
						if(!sameSlugStructure){
							//console.log("slug is unique" + aSlug);
							slugUnique = true;
							return aSlug;
						}else{
							//console.log("slug is not unique" + aSlug);
							temp++;
							return recursiveLoop(structure.title + "_" + temp);	
						}
					});
				}
				recursiveLoop(slug).then( (uniqueSlug) => { 
					let emptyArray = [];
					let newStructure = {
						"_id": uuid.v4(),
						"title" : structure.title,
						"type": structure.type,
						"blurb" : structure.blurb,
						"fields" : structure.fields, "dateCreated" : new Date(), "slug" : uniqueSlug, "entries": emptyArray 
					};
					console.log(newStructure);
					return structureCollection
					.insertOne(newStructure).then( (newInsertInformation) =>{
					return newInsertInformation.insertId;
					});
				});
			});
		}).catch((e)=>{
			console.log(e);
		});
},
    removeAll(){
        return structures().then((structureCollection) => {
            return structureCollection
            .deleteMany({});
        });
    },
    removeStructure(id){
        return structures().then((structureCollection) => {
            return structureCollection
            .removeOne({_id: id}).then( (structure) => {
                if(!structure){
                    console.log("pallindrome not found");
                    throw "pallindrome not found"
                }
                return structure;
            }).catch((e)=>{
                 console.log(e);
            });
        });
    },
    updateStructure(id,structure){
        return structures().then((structureCollection) => {
            if(structure){
                console.log(id);
                structureCollection.updateOne({_id:id},{
                    $set:{
			title: structure.title,
			blurb: structure.blurb,
			type: structure.type,
			fields: structure.fields,
			date: new Date()
		    }
                });
            }
        })
    },
    addEntryToStructure(structureSlug,entry){
        return structures().then((structureCollection) => {
            if(structure){
                console.log(id);
                structureCollection.updateOne({slug:structureSlug},{
                    $push:{
			entries: entry
		    }
                });
            }
        })
    }
}

module.exports = exportedMethods;
