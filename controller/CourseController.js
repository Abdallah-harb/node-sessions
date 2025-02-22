let {courses} =require('../data/facker');
const {validationResult} = require("express-validator");
const Course = require('../model/CourseModel');

exports.index=async (req, res) => {
    const courses = await Course.find();
    return res.status(200).json({
        status: 200,
        message: "all courses",
        courses: courses
    });
}

exports.store=async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    try{
        const course = await Course.create(req.body);
        return res.status(200).json({
            status: 200,
            message: " course data",
            course: course
        })
    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,
        })
    }


}

const checkShow = async (id)=>{
    const course = await Course.findById(id);
    if (!course) {
        return res.status(404).json({
            status: 404,
            message: " course data not found",
        });
    }
    return course;
}

exports.show=async (req, res) => {
    try{
       const course =await checkShow(req.params.id);
        return res.status(200).json({
            status: 200,
            message: " course data",
            course: course
        });
    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,
        })
    }

}

exports.update = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    try{
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                status: 404,
                message: " course data not found",
            });
        }
        await Course.updateOne(req.body);
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

exports.destroy = async (req,res)=>{
    try{
        await checkShow(req.params.id);
        await Course.deleteOne({_id:req.params.id});
        return res.status(200).json({
            status: 200,
            message: " data Deleted Successfully",
        });
    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,

        })
    }
}

