const router = require('express').Router();
const User = require('../models/User');



router.post('/register', async (req, res)=>{
  const user = new User ({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  try {
    console.log("try ");
    const savedUser = await user.save();
     return res.send(savedUser);

  } catch (err) {
    res.status(400).send(err);

  }
});

module.exports = router;
