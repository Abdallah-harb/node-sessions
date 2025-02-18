const express = require('express')
const Route = express.Router();
const CourseController = require('../controller/CourseController');
const {CourseValidate} = require('../validation/CourseValdation')



Route.get('/courses',CourseController.index);
Route.get('/courses/:id',CourseController.show);
Route.post('/courses',CourseValidate(),CourseController.store);

module.exports = Route;