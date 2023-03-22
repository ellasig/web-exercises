'use strict';
const catModel = require('../models/catModel');


const getCatList = async (req, res) => {
    try {
        const cats = await catModel.getAllCats();
        res.json(cats);

    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};

const getCat = async (req, res) => {
    //convert id value to number
    const catId = Number(req.params.catId);
    //check if number is not an integer
    if(!Number.isInteger(catId)) {
        res.status(400).json({error: 500, message: 'invalid id'});
        return;
    }
    // TODO: wrap to try-catch
    const [cat] = await catModel.getCatById(catId);
    console.log('getCat', cat);

    if(cat) {
        res.json(cat);
    } else {
       //res.status(404).send("Cat not found")
        //!!voi myös laittaa json muodossa;
        res.status(404).json({message: "cat not found."})
    }

};




const postCat = async (req,res) => {
    console.log("Posting cat" ,req.body, req.file);
    const newCat = req.body;
    newCat.filename = req.file.path;
    //TODO: add try-catch
    const result = await catModel.insertCat(newCat)
    //send response if upload is successful
    res.status(201).send("new cat added");
};




const putCat = async (req, res) => {
    console.log("Modifying a cat" ,req.body);
    //TODO: add try-catch
    const cat = req.body;
    const result = await catModel.modifyCat(req.body);
    //send response if upload is successful
    res.status(200).send("Cat modified");
};
    /*
    const id = req.params.catId;
    const cat = cats.find(cat => cat.id == id)
    const updateCat = {
        id: cats[cat].id,
        name: req.params.name,
        birthdate: req.params.birthdate,
        weight: req.params.weight,
        owner: req.params.owner,
        filename: req.params.filename,
    };
    cats[cat] = updateCat
    res.json("Cat info updated")

};*/


const deleteCat = async (req, res) => {
    console.log("Deleting a cat" ,req.params.catId);
    //TODO: add try-catch
    const cat = req.body;
    const result = await catModel.deleteCat(req.params.catId);
    //send response if upload is successful
    res.status(200).send("Cat deleted");
};


const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;