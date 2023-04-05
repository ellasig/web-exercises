'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');

module.exports = router;


//router yhdistää reitit
router.route('/')
    .get(userController.getUserList)
    .post(
            body('name').isAlphanumeric().isLength({min: 1, max: 200}).escape().trim(),
            body('email').isEmail(),
            body('passwd').isLength({min: 8}),
        userController.postUser)
    .put(
        body('name').isAlphanumeric().isLength({min: 1, max: 200}),
        body('email').isEmail(),
        body('passwd').isLength({min: 8})
        ,userController.putUser)

router.get('/token', userController.checkToken);

router.route('/:userId')
    .get(userController.getUser)
    .delete(userController.deleteUser);



