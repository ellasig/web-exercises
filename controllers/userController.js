'use strict';
const userModel = require('../models/userModel');

//TODO: ADD DB CONNECTIONS and functions to usermodel
const users = userModel.users;
//remove passwords
for (const user of users) {
    delete user.password;
}

const getUserList = (req, res) => {
    res.json(users);
};

const getUser =  (req, res) => {
    const id = req.params.userId;
    //TODO: filter matching cat based on id
    //TODO: response 404 if id not found in array (res.status(404))
    const user = users.find(user => user.id === id);
    if(!user) {
        res.status(404).send("user not found")
        return;
    }
    res.json(user);
}

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



const putUser = (req, res) => {
    const id = req.params.userId;
    const user = users.find(user => user.id === id)
    const updateUser = {
        id: users[user].id,
        name: req.params.name,
        email: req.params.email,
        password: req.params.password

    }
    users[user] = updateUser
    res.json("User info updated")

}

const deleteUser = (req, res) => {

}


const userController = {getUserList, getUser, postUser, putUser, deleteUser};
module.exports = userController;