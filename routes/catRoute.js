'use strict';
const express = require('express');
const multer = require("multer");
const router = express.Router();
const catController = require('../controllers/catController');
const {body} = require('express-validator');

const fileFilter = (req, file, cb) => {
    const allowTypes = ['image/jpeg', 'image/png'];
    if(allowTypes.includes(file.mimetype)) {
        //accept file
        cb(null, true);
    } else {
        // reject file
        cb(null, false);
    }
};

//multer käytössä vaan catpostissa
const upload = multer({dest: 'uploads/', fileFilter});


//router yhdistää reitit
//Root of the cat endpoint
router.route('/')
    .get(catController.getCatList)
    .post(upload.single('cat')
        ,body('name').isAlphanumeric().isLength({min: 1, max: 200}).escape().trim(),
        body('birthdate').isDate(),
        body('weight').isFloat({min: 0.1, max: 50}),
        body('owner').isInt({min: 1})
        ,catController.postCat)

    .put(
        body('name').isAlphanumeric().isLength({min: 1, max: 200}),
        body('birthdate').isDate(),
        body('weight').isFloat({min: 0.1, max: 50}),
        body('owner').isInt({min: 1})
        ,catController.putCat)

//All /cat/:id endpoints
router.route('/:id')
    .get(catController.getCat)
    .delete(catController.deleteCat);

module.exports = router;
