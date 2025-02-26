const User = require("../model/UserModel");
const Auth =async (req)=>{
    return  await User.findOne({email:req.user.email});
}

module.exports={Auth}