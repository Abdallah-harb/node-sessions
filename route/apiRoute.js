const express = require('express')
const Route = express.Router();
const CourseController = require('../controller/CourseController');
const {CourseValidate, validateRequest } = require('../validation/CourseValdation')



Route.get('/courses',CourseController.index);
Route.get('/courses/:id',CourseController.show);
Route.post('/courses',CourseValidate(),validateRequest,CourseController.store);
Route.put('/courses/:id',CourseValidate(),validateRequest,CourseController.update);
Route.delete('/courses/:id',CourseController.destroy);

module.exports = Route;