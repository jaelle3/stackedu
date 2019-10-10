const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//create registration route
router.post('/signup', async (req, res)=>{

//check if email already exists
  const emailExists = await User.findOne({email: req.body.email});
  if(emailExists) return res.status(400).send("Email already exists");

  //Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);



  const user = new User ({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });
  try {

    const savedUser = await user.save();
     return res.send(savedUser);

  } catch (err) {
    res.status(400).send(err);

  }
});

//Login routes
router.post('/login', async (req, res) =>{
  //Check if user is in database
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send("User doesnt exist");

  //Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Invalid password');

  //Create jsonwebtoken
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);


  res.send('Logged In!');

})

module.exports = router;
