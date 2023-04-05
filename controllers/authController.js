"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");

const login = (req, res) => {

    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            console.log('auth error', info);
            return res.status(401).json({
                message: 'Username / password wrong',
                //or more detailed message:  message: info.message,
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.json({message: err});
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, 'your_jwt_secret');
            //TODO: do you really need to include whole user to token payload? esim user.email
            return res.json({user, token});
        });
    })(req, res);
};

module.exports = {
    login,
};