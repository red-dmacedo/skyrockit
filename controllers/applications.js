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

router.get('/new', async (req, res) => {
  res.render('applications/new.ejs');
});

router.post('/', async (req, res) => {
  try{
    const curUser = await User.findById(req.session.user._id);
    curUser.applications.push(req.body);
    await curUser.save();
    res.redirect(`/users/${curUser._id}/applications`);
  }
  catch(err){
    console.log(err);
    res.redirect('/');
  };
});

module.exports = router;
