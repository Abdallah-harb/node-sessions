const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");
const schema = new mongoose.Schema(
{
    name: { type: String, required: true },
    sessions: { type: Number, required: true },
    instructor: { type: String, required: true },
    date: { type: Date, required: true }
    },
{ timestamps: true ,versionKey: false}
);
schema.plugin(mongoosePaginate);

module.exports= mongoose.model('Course', schema);
