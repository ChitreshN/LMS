const Book          = require('../models/book')
const Assignments   = require('../models/assignments')
const Course        = require('../models/course')
const asynchandler  = require('express-async-handler')

exports.index = asynchandler(async (req,res,next) =>{
    const [course_cnt, book_cnt, assignments_cnt,course_in_progress,] = await Promise.all([
        Course.countDocuments({}).exec(),
        Assignments.countDocuments({status : "Incomplete"}).exec(),
        Book.countDocuments({}).exec(),
        Course.countDocuments({status: "In Progress"}).exec(),
    ])

    res.render('index',{
        title : 'Personal LMS',
        course_cnt : course_cnt,
        course_in_progress : course_in_progress,
        book_cnt : book_cnt,
        assignments_cnt : assignments_cnt
    })
}) 

exports.course_create_get = asynchandler(async (req,res,next)=>{
    res.render('course_form',{
        title : 'Create a new course',
    })
})
exports.course_detail= asynchandler(async (req,res,next)=>{
    const [course,assignments,books] = await Promise.all([
        Course.findById(req.params.id).exec(),
        Assignments.find({course:req.params.id}).exec(),
        Book.find({course:req.params.id}).exec()
    ])
    res.send(course,assignments,books)
})
exports.course_delete_get= asynchandler(async (req,res,next)=>{

})
exports.course_update_get= asynchandler(async (req,res,next)=>{

})
exports.course_list= asynchandler(async (req,res,next)=>{

})
exports.course_create_post = asynchandler(async (req,res,next)=>{
    const course = new Course({
        title : req.body.title,
        summary : req.body.summary,
    })
    console.log('here')
    await course.save()
    console.log('done saving')
    res.redirect(course.url)

})
exports.course_delete_post = asynchandler(async (req,res,next)=>{

})
exports.course_update_post = asynchandler(async (req,res,next)=>{

})
