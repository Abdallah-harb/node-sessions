const { body, validationResult } = require("express-validator");

const CourseValidate = () => [
    body("name")
        .notEmpty().withMessage("Name field is required.")
        .isLength({ min: 4, max: 100 }).withMessage("Name must be between 4 and 100 characters."),

    body("sessions")
        .notEmpty().withMessage("Session field is required.")
        .isInt().withMessage("Session must be an integer value.")
        .isInt({ min: 1, max: 100 }).withMessage("Session must be between 1 and 100."),

    body("instructor")
        .notEmpty().withMessage("Instructor field is required."),

    body("date")
        .notEmpty().withMessage("Date field is required.")
        .isISO8601().withMessage("Date must be in the format YYYY-MM-DD.")
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 422,
            message: "Validation failed",
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

module.exports = { CourseValidate, validateRequest };
