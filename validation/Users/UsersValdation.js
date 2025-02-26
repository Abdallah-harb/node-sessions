const { body } = require("express-validator");
const {handelErrorValidate} = require('../../Helpier/ErrorValidat');
const User = require("../../model/UserModel");
const UserRole = require('../../Enum/RoleEnum');
const UserValidation = (isUpdate = false) => [
    body("name")
        .notEmpty().withMessage("Name field is required.")
        .isLength({ min: 4, max: 100 }).withMessage("Name must be between 4 and 100 characters."),

    body("email")
        .notEmpty().withMessage("email field is required.")
        .isEmail().withMessage("email must be valid email.")
        .custom(async (value, { req }) => {
            const userId = req.params.id; // Get user ID (for update)
            const existingUser = await User.findOne({ email: value });

            if (existingUser && (!isUpdate || existingUser._id.toString() !== userId)) {
                throw new Error("Email is already taken.");
            }
            return true;
        }),

    body("password")
        .if((value, { req }) => !isUpdate || value)
        .notEmpty().withMessage("Password field is required.")
        .isLength({ min: 6, max: 100 }).withMessage("Password must be between 6 and 100 characters."),

    body("passwordConfirmation")
        .if((value, { req }) => req.body.password)
        .notEmpty().withMessage("Password confirmation field is required.")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password confirmation does not match password.");
            }
            return true;
        }),

    body('role')
        .optional()
        .isIn(Object.values(UserRole)).withMessage(`Role must be one of: ${Object.values(UserRole).join(", ")}`)

];


module.exports = { UserValidation, handelErrorValidate };
