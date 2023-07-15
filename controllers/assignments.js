const Book          = require('../models/book')
const Assignments   = require('../models/assignments')
const Course        = require('../models/course')
const asynchandler  = require('express-async-handler')

exports.assignment_create_get = asynchandler(async (req,res,next)=>{

    const courses = await Course.find().exec()
    res.render('create_assignment_form',{title: 'Assignment Form',courses : courses})

})
exports.assignment_detail= asynchandler(async (req,res,next)=>{
    const assignment = new Assignments({
        details : req.body.details,
        date_announced : req.body.date_announced,
        date_due : req.body.date_due,
        material : req.body.material,
        course : req.body.course,
    })

    await assignment.save()
    res.redirect(assignment.url)
})
exports.assignment_delete_get= asynchandler(async (req,res,next)=>{

})
exports.assignment_update_get= asynchandler(async (req,res,next)=>{

})
exports.assignment_list= asynchandler(async (req,res,next)=>{

})
exports.assignment_create_post = asynchandler(async (req,res,next)=>{

})
exports.assignment_delete_post = asynchandler(async (req,res,next)=>{

})
exports.assignment_update_post = asynchandler(async (req,res,next)=>{

})
