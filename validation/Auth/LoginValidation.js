const { body } = require("express-validator");
const {handelErrorValidate} = require('../../Helpier/ErrorValidat');
const LoginValidate = () => [

    body("email")
        .notEmpty().withMessage("email field is required.")
        .isEmail().withMessage("email must be valid email."),

    body("password")
        .notEmpty().withMessage("password field is required.")
        .isLength({max:100}).withMessage('max characters for Password  100 .'),
];

module.exports = { LoginValidate, handelErrorValidate };
