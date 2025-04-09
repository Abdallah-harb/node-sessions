const {join} = require('path')
const { io } = require('../../index');

exports.index =  (req,res)=>{
    return  res.sendFile(join(__dirname, '..','..','view','index.html'));
}

