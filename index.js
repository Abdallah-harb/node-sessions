const express = require('express')
const {body,validationResult} = require('express-validator')

const app = express()

const port = 3001;
const apiRoute = require('./route/apiRoute');
// to handel request json its
app.use(express.json())
app.use('/api',apiRoute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})