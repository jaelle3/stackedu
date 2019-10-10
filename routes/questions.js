const router = require('express').Router();
const Question = require('../models/Question');
const verification = require('./verifytoken');

//create a route for posting questions
router.post('/questions', async (req, res) => {
  const question = new Question({
   question: req.body.question

  });

 try{
   const savedQuestion = await question.save();
   return res.send(savedQuestion);

 }catch(err){
  res.status(400).send("Did not save questions");
  }

});


//Route for retrieving questions
router.get('/', verification, (req, res) =>{
  res.json({question: 'What is programming?'});

})




module.exports = router;
