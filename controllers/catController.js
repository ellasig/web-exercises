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




const postCat = (req,res) => {
    console.log("Posting cat" ,req.body, req.file);
    const newCat = req.body;
    newCat.filename = 'http://localhost:3000/' + req.file.path;
    cats.push(newCat);
    //send response if upload is successful
    res.status(201).send("new cat added");
};




const putCat = (req, res) => {
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

};

const deleteCat = (req, res) => {

}


const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;