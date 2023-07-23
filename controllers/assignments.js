const Book          = require('../models/book')
const Assignments   = require('../models/assignments')
const Course        = require('../models/course')
const asynchandler  = require('express-async-handler')

exports.assignment_list= asynchandler(async (req,res,next)=>{
    const assignments = await Assignments.find().exec()
    res.send({
        assignments : assignments,
    })

})

exports.assignment_detail= asynchandler(async (req,res,next)=>{
    const assignment = await Assignments.findById(req.params.id).exec()
    res.send({
        assignment : assignment,
    })
})

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

exports.assignment_update_get= asynchandler(async (req,res,next)=>{
    res.send("send update form")
})

exports.assignment_update_post = asynchandler(async (req,res,next)=>{
    const assignment = await Assignments.findById(req.params.id).exec()
    const up_assignment = new Assignments({
        details: typeof req.body.details == "undefined" ? assignment.details : req.body.details, 
        date_due: typeof req.body.date_due == "undefined" ? assignment.date_due : req.body.date_due, 
        date_announced:  assignment.date_announced , 
        material: typeof req.body.material == "undefined" ? assignment.material : req.body.material, 
        status: typeof req.body.status == "undefined" ? assignment.status : req.body.status, 
        course: typeof req.body.course == "undefined" ? assignment.course : req.body.course, 
        _id : req.params.id,
    })
    await Assignments.findByIdAndUpdate(req.params.id,up_assignment,{})
    res.send({
        updated_assignment: up_assignment,
    })
})

exports.assignment_delete_get= asynchandler(async (req,res,next)=>{
    res.send("send delete form, i no do frontend, ui yuck")
})

exports.assignment_delete_post = asynchandler(async (req,res,next)=>{
    const assignment = await Assignments.findByIdAndDelete(req.params.id).exec()
    res.send({
        deleted_assignment_info : assignment,
    })
})

