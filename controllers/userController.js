'use strict';
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const getUserList = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getUser = async (req, res) => {
    //console.log(req.params);
    const id = req.params.userId;
    const user = await userModel.getUserById(id);
    if (user) {
        res.json(user);
    } else {
        // send 404 response if user not found
        // res.sendStatus(404);
        res.status(404).json({message: 'User not found.'});
    }
};

const postUser = async (req, res) => {
    console.log('Creating a new user: ', req.body);

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.passwd, salt);

    // new user
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: password,
        role: 1, // default user role (normal user)
    };

    // Validate the request body
    const errors = validationResult(req);
    console.log('validation errors', errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'User creation failed',
            errors: errors.array(),
        });
    }

    try {
        // Insert the new user into the database
        const result = await userModel.insertUser(newUser);
        res.status(201).json({ message: 'User created', userId: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


    /*
    const errors = validationResult(req);
    console.log('validation errors', errors);
    if (errors.isEmpty()) {
        try {
            const result = await userModel.insertUser(newUser);
            res.status(201).json({message: 'user created', userId: result});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    } else {
        res.status(400).json({
            message: 'user creation failed',
            errors: errors.array(),
        });
    }
};*/

const putUser = async (req, res) => {
    console.log("Modifying a user" ,req.body);
    //TODO: add try-catch
    const user = req.body;
    const result = await userModel.modifyUser(user);
    res.status(200).json({message: "User modified"});

};

const deleteUser = async (req, res) => {
    console.log("Deleting a user" ,req.params.userId);
    //TODO: add try-catch
    const user = req.body;
    const result = await userModel.deleteUser(req.params.userId);
    //send response if upload is successful
    res.status(200).send("User deleted");
};

const checkToken = (req, res) => {
    res.json({user: req.user});
};

const userController = {
    getUserList,
    getUser,
    postUser,
    putUser,
    deleteUser,
    checkToken,
};
module.exports = userController;