const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");
const schema = new mongoose.Schema(
    {
        conversation_id:{type:mongoose.Schema.Types.ObjectId, ref:"Conversation",required:true},
        sender_id: { type: mongoose.Schema.Types.ObjectId, ref:"User",required: true },
        receiver_id: { type: mongoose.Schema.Types.ObjectId, ref:"User",required: true },
        message: { type: String, required: true },
        read_at:{type:Date,required:false}
    },
    { timestamps: true ,versionKey: false}
);
schema.plugin(mongoosePaginate);
module.exports= mongoose.model('Message', schema);
