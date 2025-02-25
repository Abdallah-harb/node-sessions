require('dotenv').config()
const express = require('express')
const corsMiddleware = require('./middleware/CorsMiddleware');
const connectDB = require('./database/connection');
const app = express();
const port = process.env.APP_PORT;
const apiRoute = require('./route/apiRoute');


connectDB;

app.use(express.json());
corsMiddleware(app);
app.use('/api',apiRoute);

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