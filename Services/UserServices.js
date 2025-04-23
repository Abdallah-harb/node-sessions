const User = require("../model/UserModel");
const Auth = async (req,res)=>{
   return await User.findOne({email: req.body.email});
}

module.exports={Auth}