const User = require('../../model/UserModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const register = async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({name:req.body.name,email:req.body.email,password: hashedPassword});
        return res.status(200).json({
            status: 200,
            message: " Registered Successfully .!",
        })
    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,
        })
    }
}

const login =async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(401).json({status: 401,message: "Invalid credentials",})
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({status: 401,message: "Invalid credentials",})
        }

        const token = jwt.sign({ email: user.email }, 'secret',{expiresIn:'1d'});

        return res.status(200).json({
            status: 200,
            message: "success",
            token:token
        })
    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,
        })
    }

}

const user =async (req,res)=>{
    try{
        const user = await User.findOne({email:req.user.email});

        return res.status(200).json({
            status: 200,
            message: "success",
            user:user
        })
    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,
        })
    }

}

module.exports={
    register,login,user
}