'use strict';
const catModel = require('../models/catModel');


const getCatList = async (req, res) => {
    try {
        let cats = await catModel.getAllCats();
        //convert ISO date to date only
        //should this be done in the front-end side?
        cats = cats.map(cat => {
            cat.birthdate = cat.birthdate.toISOString().split('T')[0];
            return cat;
        });
        res.json(cats);
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};

const getCat = async (req, res) => {
    try {
        //convert id value to number
        const catId = Number(req.params.catId);
        //check if number is not an integer
        if (!Number.isInteger(caId)) {
            res.status(400).json({error: 500, message: 'invalid id'});
            return;
        }
        const [cat] = await catModel.getCatById(catId);
        console.log('getCat', cat);

        if (cat) {
            res.json(cat);
        } else {
            res.status(404).json({message: "cat not found."})
        }
    } catch (error) {
        console.error("error", error.message);
        res.status(500).json({error: 500, message: "sql query failed"})
    }

};

const postCat = async (req,res) => {
    console.log("Posting cat" ,req.body, req.file);
    const newCat = req.body;
    newCat.filename = req.file.path;
    try {
        const result = await catModel.insertCat(newCat)
        res.status(201).json({message: 'new cat added!'});
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};




const putCat = async (req, res) => {
    console.log("Modifying a cat" ,req.body);
    const cat = req.body;
    try {
        const result = await catModel.modifyCat(cat);
        //send response if upload is successful
        res.status(200).json({message: "Cat modified"});
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};


const deleteCat = async (req, res) => {
    console.log("Deleting a cat" ,req.params.catId);
    try {
        const result = await catModel.deleteCat(req.params.catId);
        res.status(200).json({message: "Cat deleted"});
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};


const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;