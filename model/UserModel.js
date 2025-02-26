const mongoose = require('mongoose');
const UserRole = require('../Enum/RoleEnum');
const mongoosePaginate = require("mongoose-paginate-v2");
const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true,unique:true },
        email_verified_at: { type: String, required: false },
        password: { type: String, required: true },
        role:{type:String,enum:[UserRole.USER,UserRole.ADMIN,UserRole.MANAGER],default:UserRole.USER}
    },
    { timestamps: true ,versionKey: false}
);
schema.plugin(mongoosePaginate);

// Automatically remove the password when converting to JSON
schema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
module.exports= mongoose.model('User', schema);
