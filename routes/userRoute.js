'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

module.exports = router;

//router yhdistää reitit
router.get('/', userController.getUserList);
router.get('/:userId', userController.getUser);

router.post('/', userController.postUser);
router.put('/', userController.putUser);
router.delete('/:userId', userController.deleteUser);



//TODO: add user/:id and other endpoints needed



