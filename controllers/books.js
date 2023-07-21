const Book          = require('../models/book')
const Assignments   = require('../models/assignments')
const Course        = require('../models/course')
const asynchandler  = require('express-async-handler')

exports.book_create_get = asynchandler(async (req,res,next)=>{
    res.send("send course create form")
})
exports.book_create_post = asynchandler(async (req,res,next)=>{
    const title = req.body.title
    console.log(req.body)
    const course_= await Course.findOne({title:req.body.course}).exec()
    const link = req.body.link
    const book = new Book({
        title : title,
        course: course_._id,
        link : link,
    })
    await book.save()
    res.send({
        book : book,
    })
})
exports.book_detail= asynchandler(async (req,res,next)=>{
    const book = await Book.findById(req.params.id).exec()
    res.send({
        book: book,
    })
})
exports.book_delete_get= asynchandler(async (req,res,next)=>{

})
exports.book_update_get= asynchandler(async (req,res,next)=>{

})
exports.book_list= asynchandler(async (req,res,next)=>{
    const books = await Book.find().exec()
    res.send({
        book : books,
    })

})
exports.book_delete_post = asynchandler(async (req,res,next)=>{

})
exports.book_update_post = asynchandler(async (req,res,next)=>{

})
