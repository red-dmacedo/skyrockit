const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const authController = require('./controllers/auth.js');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const applicationsController = require('./controllers/applications.js');

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI); // start connection to database

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Placed before route definitions to allow usage within
app.use(passUserToView); // pass user info to EJS templates

app.get('/', (req, res) => {
  (req.session.user) ?
    res.redirect(`/users/${req.session.user._id}/applications`) :
    res.render('index.ejs');
});

app.use('/auth', authController); // auth routes
app.use(isSignedIn); // Placed AFTER routes to allow user to sign-in first
app.use('/users/:userId/applications', applicationsController); // application routes

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
