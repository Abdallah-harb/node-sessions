const { body } = require("express-validator");
const {handelErrorValidate} = require('../../Helpier/ErrorValidat');
const User = require("../../model/UserModel");
const RegisterValidate = () => [
    body("name")
        .notEmpty().withMessage("Name field is required.")
        .isLength({ min: 4, max: 100 }).withMessage("Name must be between 4 and 100 characters."),

    body("email")
        .notEmpty().withMessage("email field is required.")
        .isEmail().withMessage("email must be valid email.")
        .custom(async (value) => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser) {
                throw new Error("Email is already taken.");
            }
            return true;
        }),

    body("password")
        .notEmpty().withMessage("password field is required.")
        .isLength({min:6,max:100}).withMessage('Password Must be Between 4 and 100 characters.'),

    body('passwordConfirmation')
        .notEmpty().withMessage("passwordConfirmation field is required.")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password confirmation does not match password.");
            }
            return true;
        }),
];

module.exports = { RegisterValidate, handelErrorValidate };
