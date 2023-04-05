"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const { getUserLogin } = require("../models/userModel");

// local strategy for username password login
passport.use(
    new Strategy(async (email, password, done) => {
        try {
            const [user] = await getUserLogin(email);
            console.log("Local strategy", user); // result is binary row
            if (user === undefined) {
                return done(null, false, { message: "Incorrect email." });
            }
            if (user.password !== password) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, { ...user }, { message: "Logged In Successfully" }); // use spread syntax to create shallow copy to get rid of binary row type
        } catch (err) {
            console.log('passport error', err);
            return done(err);
        }
    })
);

// TODO: JWT strategy for handling bearer token
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET



module.exports = passport;