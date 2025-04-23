const User = require('../../model/UserModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {Auth,sendMail} = require("../../Services/AuthServices");
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

const getUser =async (req,res)=>{
    try{
        const user = await Auth(req);

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

const forgetPassword = async (req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({status:404,message:"these email not exists, please enter valid email"});
        }
        // create token
        const token = jwt.sign({ email: user.email,id:user.id }, 'secret',{expiresIn:'10m'});
        const link = `${process.env.APP_URL}/password/reset-password/${user.id}/${token}`;

         // send mail
        let sent = false;
        try{
             await sendMail({user_mail:req.body.email,link:link});
              sent = true;
        }catch (e) {
             sent = false;
        }


        return res.status(200).json({
            status: 200,
            message: "please check your email .!",
            sent : sent
        })
    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,
        })
    }
}

const resetPassword = async (req,res)=>{
    try {



    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,
        })
    }
}

module.exports={
    register,login,getUser,forgetPassword,resetPassword
}