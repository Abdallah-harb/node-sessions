const mongoose = require('mongoose');
const schema = new mongoose.Schema(
{
    name: { type: String, required: true },
    sessions: { type: Number, required: true },
    instructor: { type: String, required: true },
    date: { type: Date, required: true }
    },{ timestamps: true });
module.exports= mongoose.model('Course', schema);
