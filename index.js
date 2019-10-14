
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//import routes
const authRoute = require('./routes/auth');
const questionRouter =require('./routes/questions');


dotenv.config();

//connect to DB
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_CONNECT,

() =>console.log('connected to DB')
);

//calling bodyparser
app.use(express.json());



//route middleware
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/', questionRouter);

app.listen(3000, () => {console.log('Server is running');});
