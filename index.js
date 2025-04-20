require('dotenv').config()
const express = require('express')
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const corsMiddleware = require('./middleware/CorsMiddleware');
const connectDB = require('./database/connection');
const app = express();
const server = createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
const port = process.env.APP_PORT;
const apiRoute = require('./route/apiRoute');
const path = require('path');
global._io = io; // Make io accessible globally
// to avoid circular dependency
require('./socket')(io);
connectDB;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

corsMiddleware(app);
app.use('/Storage', express.static(path.join(__dirname,'Storage')));
app.use('/api',apiRoute);
app.all('*',(req,res)=>{
    return res.status(404).json({
        status: 404,
        message: "Resource Not Available .!",
    });
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})