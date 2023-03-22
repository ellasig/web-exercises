'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats;

const getCatList = (req, res) => {
    res.json(cats);
};

const getCat =  (req, res) => {
    const id = req.params.catId;
    //TODO: filter matching cat based on id
    //TODO: response 404 if id not found in array (res.status(404))
    const cat = cats.find(cat => cat.id == id);
    if(!cat) {
        res.status(404).send("Cat not found")
        return;
    }
    res.json(cat);
}

/* vaihtoehto 2 getCat
    const id.req.params.catId
    const filteredCats = cats.filter(cat => id == cat.id);
    if(filteredCats.lengts > 0) {
        res.json(filteredCats[0];
        } else {
            res.status(404).send("Cat not found")
            !!voi myös laittaa json muodossa;
            -> res.status(404).json({message: "cat not found."})
        }
    const cat = filteredCat[0];
    res.json(cat);
    };
*/

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