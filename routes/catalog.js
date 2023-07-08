const express = require('express')
const router = express.Router();

const course_controller = require('../controllers/courses')
const book_controller = require('../controllers/books')  
const assignment_controller = require('../controllers/assignments')  

router.get('/',course_controller.index)
router.get('/course/create',course_controller.course_create_get)
router.post('/course/create',course_controller.course_create_post)
router.get('/course/:id/delete',course_controller.course_delete_get)
router.post('/course/:id/delete',course_controller.course_delete_post)
router.get('/course/:id/update',course_controller.course_update_get)
router.post('/course/:id/update',course_controller.course_update_post)
router.get('/course/:id',course_controller.course_detail)
router.get('/courses',course_controller.course_list)

router.get('/book/create',book_controller.book_create_get)
router.post('/book/create',book_controller.book_create_post)
router.get('/book/:id/delete',book_controller.book_delete_get)
router.post('/book/:id/delete',book_controller.book_delete_post)
router.get('/book/:id/update',book_controller.book_update_get)
router.post('/book/:id/update',book_controller.book_update_post)
router.get('/book/:id',book_controller.book_detail)
router.get('/books',book_controller.book_list)

router.get('/assignment/create',assignment_controller.assignment_create_get)
router.post('/assignment/create',assignment_controller.assignment_create_post)
router.get('/assignment/:id/delete',assignment_controller.assignment_delete_get)
router.post('/assignment/:id/delete',assignment_controller.assignment_delete_post)
router.get('/assignment/:id/update',assignment_controller.assignment_update_get)
router.post('/assignment/:id/update',assignment_controller.assignment_update_post)
router.get('/assignment/:id',assignment_controller.assignment_detail)
router.get('/assignments',assignment_controller.assignment_list)

module.exports = router
