'use strict';
const express = require('express');
const cors = require('cors');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const passport = require('./utils/passport');

const app = express();
const port = 3000;

//Log middleware
app.use((req, res, next) => {
    console.log(Date.now() + ": request: " + req.method + " " + req.path);
    next();
});

//Serve example-ui
app.use(express.static('example-ui'));
//server uploaded files
app.use('/uploads', express.static('uploads'))

//add cors headers using cors middleware
app.use(cors());

//middleware parsing request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use('/cat', catRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
