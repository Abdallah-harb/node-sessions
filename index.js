require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.APP_PORT;
const apiRoute = require('./route/apiRoute');

const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

mongoose.connect(url).then(()=>{

});


// to handel request json its
app.use(express.json())
app.use('/api',apiRoute);
app.use(cors())
// handel Not Found Route
app.all('*',(req,res)=>{
    return res.status(404).json({
        status: 404,
        message: "Resource Not Available .!",
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})