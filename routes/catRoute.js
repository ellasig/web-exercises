'use strict';
const express = require('express');
const multer = require("multer");
const router = express.Router();
const catController = require('../controllers/catController');

//multer käytössä vaan catpostissa
const upload = multer({dest: 'uploads/'});


//router yhdistää reitit
//Root of the cat endpoint
router.route('/')
    .get(catController.getCatList)
    .post(upload.single('cat'),catController.postCat)
    .put(catController.putCat)

//All /cat/:id endpoints
router.route('/: catId')
    .get(catController.getCat)
    .delete(catController.deleteCat);

module.exports = router;
