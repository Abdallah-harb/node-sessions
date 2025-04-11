const User = require('../../model/UserModel');
const bcrypt = require("bcryptjs");
const fs = require('fs');
const index =async (req,res)=>{
    try{
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
        };
        const users = await User.paginate({}, options);
        return res.status(200).json({
            status: 200,
            message: "success",
            users: users['docs'],
        });
    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,
        })
    }
}

const store =async (req,res)=>{
    try{
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const avatarPath =  req.file ? req.file.path : null;
        const user = await User.create(
            {name:name,
                email:email,
                password: hashedPassword,
                role:role,
                avatar:avatarPath
            });
        return res.status(200).json({
            status: 200,
            message: "new User Created ",
            user:user
        })
    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,
        })
    }

}

const find = async (id)=>{
    return await User.findOne({_id:id});

}

const show = async (req,res)=>{
    try{
        const user = await find(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "Resource not found",
            });
        }
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

const update = async (req,res)=>{
    try{
        const user = await find(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "Resource not found",
            });
        }

        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        if(req.file){
            if (user.avatar && fs.existsSync(user.avatar)) {
                fs.unlinkSync(user.avatar);
            }
            req.body.avatar = req.file.path;
        }

        await User.updateOne(req.body)
        return res.status(200).json({
            status: 200,
            message: " data Updated Successfully",
        });


    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,
        })
    }

}

const destroy =async (req,res)=>{
    try{
        const user = await find(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "Resource not found",
            });
        }
        // delete file of user
        if (user.avatar && fs.existsSync(user.avatar)) {
            fs.unlinkSync(user.avatar);
        }
        await User.deleteOne({_id:req.params.id});
        return res.status(200).json({
            status: 200,
            message: " Data deleted successfully .!",
        });

    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,
        })
    }

}

module.exports={index,store,show,update,destroy}