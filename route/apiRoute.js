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
const { upload } = require('../Services/HandelImages');
const ChatController = require('../controller/chat/ChatController');

// public routes
Route.post('/register',RegisterValidate(),handelErrorValidate,AuthController.register);
Route.post('/password/forget-password',AuthController.forgetPassword);
Route.post('/password/reset-password/:user_id/:token',AuthController.resetPassword);
Route.post('/login',LoginValidate(),handelErrorValidate,AuthController.login);

// auth routes
Route.get('/user', checkAuth,AuthController.getUser);

// users
Route.get('/users',checkAuth,UserController.index);
Route.post('/users',checkAuth, upload.single('avatar'),UserValidation(),handelErrorValidate,UserController.store);
Route.get('/users/:id',checkAuth,UserController.show);
Route.put('/users/:id',checkAuth,upload.single('avatar'),UserValidation(true),handelErrorValidate,UserController.update);
Route.delete('/users/:id',checkAuth,UserController.destroy);

//course
Route.get('/courses', checkAuth,CourseController.index);
Route.get('/courses/:id', checkAuth,CourseController.show);
Route.post('/courses', checkAuth,CourseValidate(),handelErrorValidate,CourseController.store);
Route.put('/courses/:id', checkAuth , CourseValidate(),handelErrorValidate,CourseController.update);
Route.delete('/courses/:id', checkAuth,CourseController.destroy);

//chat
Route.get('/chat',ChatController.index);

module.exports = Route;