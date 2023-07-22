const Book          = require('../models/book')
const Assignments   = require('../models/assignments')
const Course        = require('../models/course')
const asynchandler  = require('express-async-handler')

exports.index = asynchandler(async (req,res,next) =>{
    const [course_cnt, assignments_cnt, book_cnt,course_in_progress,] = await Promise.all([
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

exports.course_detail= asynchandler(async (req,res,next)=>{
    const [course,assignments,books] = await Promise.all([
        Course.findById(req.params.id).exec(),
        Assignments.find({course:req.params.id}).exec(),
        Book.find({course:req.params.id}).exec()
    ])
    res.send(course,assignments,books)
})

exports.course_list= asynchandler(async (req,res,next)=>{
    const courses = await (Course.find().exec())
    res.send({
        courses : courses,
    })

})

exports.course_create_get = asynchandler(async (req,res,next)=>{
        res.render('course_form',{
        title : 'Create a new course',
    })
})

exports.course_create_post = asynchandler(async (req,res,next)=>{
    console.log(req.body.title)
    const course = new Course({
        title : req.body.title,
        summary : req.body.summary,
    })
    await course.save()
    res.send({
        course : course
    })

})

exports.course_update_get= asynchandler(async (req,res,next)=>{
    res.send('render_form')
})

exports.course_update_post = asynchandler(async (req,res,next)=>{
    const course = await Course.findById(req.params.id).exec()
    const updated_course = new Course({
        title : typeof req.body.title == 'undefined' ? course.title : req.body.title,
        summary :typeof req.body.summary == 'undefined' ? course.summary: req.body.summary,
        status : typeof req.body.status == 'undefined' ? course.status: req.body.status,
        _id : req.params.id,
    })
    const update_db = await Course.findByIdAndUpdate(req.params.id,updated_course,{})
    res.send({
        updated_course : updated_course,
    })
})

exports.course_delete_get= asynchandler(async (req,res,next)=>{
    res.send('render_form here too')
})

exports.course_delete_post = asynchandler(async (req,res,next)=>{

})
