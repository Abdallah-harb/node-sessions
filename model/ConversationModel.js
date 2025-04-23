const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");
const schema = new mongoose.Schema(
    {
        sender_id: { type: mongoose.Schema.Types.ObjectId, ref:"User",required: true },
        receiver_id: { type: mongoose.Schema.Types.ObjectId, ref:"User",required: true },
        last_message: { type: String, required: false }
    },
    { timestamps: true ,versionKey: false}
);
schema.index({ sender_id: 1, receiver_id: 1 }, { unique: true });
schema.plugin(mongoosePaginate);
module.exports= mongoose.model('Conversation', schema);
