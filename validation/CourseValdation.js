const {body} = require("express-validator");
const CourseValidate =()=>{
    return[
        body('name').notEmpty()
            .withMessage('name filed is required').
        isLength({min:4,max:100})
            .withMessage('min length for name is 4 character and max is 100 character'),
        body('session').notEmpty()
            .withMessage('session filed is required')
            .isInt()
            .withMessage('session must integer value')
            .isLength({min:4,max:100})
            .withMessage('min length for session is 4 character and max is 100 character'),
        body('instructor')
            .notEmpty().withMessage('instructor filed is required'),
        body('data')
            .notEmpty()
            .withMessage('data filed is required')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Data must be in the format YYYY-MM-DD')
    ];
}

module.exports={
    CourseValidate
}
