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


const postUser = async (req,res) => {
    try {
        console.log("req body: ", req.body);
        const newUser = req.body;
        const result = await userModel.insertUser(newUser);
        res.status(201).json({message:"Added user added!"})
    } catch (error) {
        console.error("error", error.message);
        res.status(500).json({error: 500, message: "SQL insert user failed"});
    }
};



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
}


const userController = {
    getUserList, getUser, postUser, putUser, deleteUser};
module.exports = userController;