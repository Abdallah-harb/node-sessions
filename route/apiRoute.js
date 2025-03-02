const express = require('express')
const Route = express.Router();
const CourseController = require('../controller/CourseController');
const {CourseValidate, handelErrorValidate } = require('../validation/CourseValdation')
const AuthController = require('../controller/Auth/AuthController');
const {RegisterValidate} = require('../validation/Auth/RegisterValidation');
const {LoginValidate} = require('../validation/Auth/LoginValidation');
const checkAuth = require('../middleware/VerifyTokenMiddleware');
const UserController = require('../controller/Users/UserController');
const {UserValidation} = require('../validation/Users/UsersValdation');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/Storage/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
const upload = multer({ storage: storage })

// public routes
Route.post('/register',RegisterValidate(),handelErrorValidate,AuthController.register);
Route.post('/login',LoginValidate(),handelErrorValidate,AuthController.login);

// auth routes
Route.get('/user', checkAuth,AuthController.getUser);

// users
Route.get('/users',checkAuth,UserController.index);
Route.post('/users',checkAuth,upload.single('avatar'),UserValidation(),handelErrorValidate,UserController.store);
Route.get('/users/:id',checkAuth,UserController.show);
Route.put('/users/:id',checkAuth,upload.single('avatar'),UserValidation(true),handelErrorValidate,UserController.update);
Route.delete('/users/:id',checkAuth,UserController.destroy);


Route.get('/courses', checkAuth,CourseController.index);
Route.get('/courses/:id', checkAuth,CourseController.show);
Route.post('/courses', checkAuth,CourseValidate(),handelErrorValidate,CourseController.store);
Route.put('/courses/:id', checkAuth , CourseValidate(),handelErrorValidate,CourseController.update);
Route.delete('/courses/:id', checkAuth,CourseController.destroy);

module.exports = Route;