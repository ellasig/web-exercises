"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const { getUserLogin, getUserById } = require("../models/userModel");

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require("dotenv").config();

// local strategy for username password login
passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const [user] = await getUserLogin(username);
            console.log("Local strategy", user); // result is binary row
            if (user === undefined) {
                return done(null, false, { message: "Incorrect username." });
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

// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET
passport.use(
    new JWTStrategy(
        {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET,
    },
        async (jwtPayload, done) => {
        // Get user data from DB using userModel or extract data from token
            console.log('user from token', jwtPayload);
            try{
                const user = await getUserById(jwtPayload.user_id);
                return done(null, user);
            }catch(error) {
                return done(error);
            }
            //or extract data from token
            //return done(null, jwtPayload);
    }
));

module.exports = passport;