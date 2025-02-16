let {courses} =require('../data/facker');
const {validationResult} = require("express-validator");
exports.index=(req,res)=>{
    return  res.status(200).json({
        status:200,
        message : "all courses",
        courses: courses
    });
}

exports.store=(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(422).json({
            errors: errors.array()
        });
    }
    return res.status(200).json({
        status:200,
        message : " course data",

    })
}

exports.show=(req,res)=>{
    const course = courses.find((course)=>course.id=== +req.params.id);
    if(!course){
        return  res.status(404).json({
            status:404,
            message : " course data not found",
        });
    }
    return  res.status(200).json({
        status:200,
        message : " course data",
        course: course
    });
}