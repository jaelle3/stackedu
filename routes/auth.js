const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');



router.post('/register', async (req, res)=>{

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

module.exports = router;
