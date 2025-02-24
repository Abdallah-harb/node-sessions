const { body } = require("express-validator");
const {handelErrorValidate} = require('../Helpier/ErrorValidat');
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


module.exports = { CourseValidate, handelErrorValidate };
