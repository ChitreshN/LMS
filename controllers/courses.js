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

    res.send({
        courses : course_cnt,
        assignments : assignments_cnt,
        books : book_cnt,
        course_in_progress : course_in_progress,
    })
}) 

exports.course_create_get = asynchandler(async (req,res,next)=>{
    console.log("recieved get request for create course")
})
exports.course_detail= asynchandler(async (req,res,next)=>{
    const [course,assignments,books] = await Promise.all([
        Course.findById(req.params.id).exec(),
        Assignments.find({course:req.params.id}).exec(),
        Book.find({course:req.params.id}).exec()
    ])
    res.send(course,assignments,books)
})

exports.course_update_get= asynchandler(async (req,res,next)=>{

})

exports.course_update_post = asynchandler(async (req,res,next)=>{

})
exports.course_list= asynchandler(async (req,res,next)=>{
    const courses = await (Course.find().exec())
    res.send({
        courses : courses,
    })

})
exports.course_create_post = asynchandler(async (req,res,next)=>{
    console.log(req.body.title)
    const course = new Course({
        title : req.body.title,
        summary : req.body.summary,
    })
    console.log('here')
    await course.save()
    console.log('done saving')
    res.send({
        course : course
    })

})

exports.course_delete_get= asynchandler(async (req,res,next)=>{

})

exports.course_delete_post = asynchandler(async (req,res,next)=>{

})
