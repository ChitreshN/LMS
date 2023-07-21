const Book          = require('../models/book')
const Assignments   = require('../models/assignments')
const Course        = require('../models/course')
const asynchandler  = require('express-async-handler')

exports.assignment_create_get = asynchandler(async (req,res,next)=>{

    const courses = await Course.find().exec()
    res.render('assignment_create_form',{title: 'Assignment Form',courses : courses})

})
exports.assignment_create_post = asynchandler(async (req,res,next)=>{
    const course_= await Course.findOne({title:req.body.course}).exec()
    console.log(course_)
    console.log(req.body) 
    const assignment = new Assignments({
        details : req.body.title,
        date_due : req.body.date_due,
        material : req.body.material,
        course : course_._id,
    })
    console.log(assignment)
    await assignment.save()
    res.send({
        assignment: assignment,
    })

})
exports.assignment_detail= asynchandler(async (req,res,next)=>{
    const assignment = await Assignments.findById(req.params.id).exec()
    res.send({
        assignment : assignment,
    })
})
exports.assignment_update_get= asynchandler(async (req,res,next)=>{
    res.send("send update form")
})
exports.assignment_update_post = asynchandler(async (req,res,next)=>{
    
})
exports.assignment_delete_get= asynchandler(async (req,res,next)=>{
    res.send("send delete form, i no do frontend, ui yuck")
})
exports.assignment_delete_post = asynchandler(async (req,res,next)=>{

})
exports.assignment_list= asynchandler(async (req,res,next)=>{
    const assignments = await Assignments.find().exec()
    res.send({
        assignments : assignments,
    })

})
