const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true,unique:true },
        email_verified_at: { type: String, required: false },
        password: { type: String, required: true },
    },
    { timestamps: true ,versionKey: false}
);

// Automatically remove the password when converting to JSON
schema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
module.exports= mongoose.model('User', schema);
