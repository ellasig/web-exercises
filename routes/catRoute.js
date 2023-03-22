'use strict';
const express = require('express');
const multer = require("multer");

const router = express.Router();
const catController = require('../controllers/catController');

//multer käytössä vaan catpostissa
const upload = multer({dest: 'uploads/'});


module.exports = router;

//router yhdistää reitit
router.get('/', catController.getCatList);
router.get('/:catId', catController.getCat);

router.post('/', upload.single('cat'),catController.postCat);
router.put('/', catController.putCat);
router.delete('/:catId', catController.deleteCat);


