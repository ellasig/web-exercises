'use strict';
const userModel = require('../models/userModel');
const catModel = require("../models/catModel");

//TODO: ADD DB CONNECTIONS and functions to usermodel
const users = userModel.users;
//remove passwords
for (const user of users) {
    delete user.password;
}

const getUserList = (req, res) => {
    res.json(users);
};

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

/* vaihtoehto 2 getCat
    const id.req.params.catId
    const filteredCats = cats.filter(cat => id == cat.id);
    //TODO: Remove password
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


const userController = {getUserList, getUser, postUser, putUser, deleteUser};
module.exports = userController;