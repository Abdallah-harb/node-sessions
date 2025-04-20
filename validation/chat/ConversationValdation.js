const { body } = require("express-validator");
const User = require('../../model/UserModel');
const ConversationValidate = () => [

    body("receiver_id")
        .notEmpty().withMessage("receiver_id field is required.")
        .isMongoId().withMessage("receiver_id must be a valid  ObjectId.")
        .custom(async (value) => {
            const user = await User.findById(value);
            if (!user) {
                return Promise.reject("User does not exist.");
            }
        }),

    body("message")
        .notEmpty().withMessage("message field is required."),
];

module.exports = { ConversationValidate};
