const express = require('express')
const Route = express.Router();
const CourseController = require('../controller/CourseController');
const {CourseValidate, handelErrorValidate } = require('../validation/CourseValdation')
const AuthController = require('../controller/Auth/AuthController');
const {RegisterValidate} = require('../validation/Auth/RegisterValidation');
const {LoginValidate} = require('../validation/Auth/LoginValidation');
const checkAuth = require('../middleware/VerifyTokenMiddleware');


Route.post('/register',RegisterValidate(),handelErrorValidate,AuthController.register);
Route.post('/login',LoginValidate(),handelErrorValidate,AuthController.login);

// auth routes
Route.get('/user', checkAuth,AuthController.user);

Route.get('/courses', checkAuth,CourseController.index);
Route.get('/courses/:id', checkAuth,CourseController.show);
Route.post('/courses', checkAuth,CourseValidate(),handelErrorValidate,CourseController.store);
Route.put('/courses/:id', checkAuth , CourseValidate(),handelErrorValidate,CourseController.update);
Route.delete('/courses/:id', checkAuth,CourseController.destroy);

module.exports = Route;