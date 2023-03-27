'use strict';
const userModel = require('../models/userModel');

const getUserList = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};
//TODO: UPDATE for new user model (check cat controller)
const getUser =  async (req, res) => {
    const userId = Number(req.params.userId);
    if(!Number.isInteger(userId)) {
        res.status(400).json({error: 500, message: 'invalid id'});
        return;
    }
    // TODO: wrap to try-catch
    const [user] = await userModel.getUserById(userId);
    console.log('getUser', user);

    if(user) {
        res.json(user);
    } else {
        res.status(404).json({message: "User not found."})
    }
};


//TODO: muokkaa postuser
const postUser = (req,res) => {
    console.log("req body: " , req.body);
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.passwd
    }
    users.push(newUser);
    res.status(201).send("Added user " + req.body.name)
};



const putUser = async (req, res) => {
    console.log("Modifying a user" ,req.body);
    //TODO: add try-catch
    const user = req.body;
    const result = await userModel.modifyUser(req.body);
    //send response if upload is successful
    res.status(200).send("User modified");

};

const deleteUser = async (req, res) => {
    console.log("Deleting a user" ,req.params.userId);
    //TODO: add try-catch
    const user = req.body;
    const result = await userModel.deleteUser(req.params.userId);
    //send response if upload is successful
    res.status(200).send("User deleted");
}


const userController = {
    getUserList, getUser, postUser, putUser, deleteUser};
module.exports = userController;