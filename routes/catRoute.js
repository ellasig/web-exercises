'use strict';
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');

module.exports = router;

//router yhdistää reitit
router.get('/', catController.getCatList);
router.get('/:catId', catController.getCat);

//TODO: move functions below to controller
router.post('/', (req, res) => {
    res.send('With this endpoint you can add cats.')
});

router.put('/', (req, res) => {
    res.send('with this endpoint you can modify a cat.')
});

router.delete('/', (req, res) => {
    res.send('with this endpoint you can delete cat.')
});
