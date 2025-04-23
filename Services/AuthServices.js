const User = require("../model/UserModel");
const nodemailer = require("nodemailer");
const Auth =async (req)=>{
    return  await User.findOne({email:req.user.email});
}

const sendMail = async (data)=>{
    const transporter = nodemailer.createTransport({
        service:process.env.MAIL_SERVICE,
        auth:{
            user:process.env.MAIL_AUTH_USER,
            pass:process.env.MAIL_AUTH_PASSWORD
        },
    });

    const mailData = {
        from:process.env.MAIL_AUTH_USER,
        to:data.user_mail,
        subject:"reset-password",
        html:`<div>
                    <h3>please click here to reset your password</h3>
                    <a style="color: blue" href="${data.link}">Reset-password</a>
            </div>`
    }
    await transporter.sendMail(mailData);
}

module.exports={Auth,sendMail}