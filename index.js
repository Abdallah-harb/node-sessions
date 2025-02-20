const express = require('express')
const {body,validationResult} = require('express-validator')
const app = express()
const port = 3001;
const apiRoute = require('./route/apiRoute');
const mongoose = require('mongoose');
const url = "mongodb+srv://abdallahabdelrahman186:Abdallah15@learn-mongo-db.74qhc.mongodb.net/codeZone?retryWrites=true&w=majority&appName=learn-mongo-db";

mongoose.connect(url).then(()=>{
    console.log('mongo db started');
})


// to handel request json its
app.use(express.json())
app.use('/api',apiRoute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})