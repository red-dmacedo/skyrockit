// controllers/applications.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here
router.get('/', (req, res) => {
  try {
    res.render('applications/index.ejs');
    // res.send('Hello applications index route!');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  };
});

module.exports = router;
