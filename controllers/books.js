const Book          = require('../models/book')
const Assignments   = require('../models/assignments')
const Course        = require('../models/course')
const asynchandler  = require('express-async-handler')

exports.book_detail= asynchandler(async (req,res,next)=>{
    const book = await Book.findById(req.params.id).exec()
    res.send({
        book: book,
    })
})

exports.book_list= asynchandler(async (req,res,next)=>{
    const books = await Book.find().exec()
    res.send({
        book : books,
    })

})

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

exports.book_update_get= asynchandler(async (req,res,next)=>{
    res.send("wht are u, a frontend dev, then please help")
})

exports.book_update_post = asynchandler(async (req,res,next)=>{
    const book = await Book.findById(req.params.id).exec()
    const up_book = new Book({
        title : typeof req.body.title == "undefined" ? book.title : req.body.tite,
        link : typeof req.body.link == "undefined" ? book.link : req.body.link,
        course : typeof req.body.course == "undefined" ? book.course : req.body.course,
        _id : book._id,
    })
    await Book.findByIdAndUpdate(req.params.id,up_book,{})
    res.send({
        updated_book : up_book,
    })
})

exports.book_delete_get= asynchandler(async (req,res,next)=>{
    res.send("send delete form")
})

exports.book_delete_post = asynchandler(async (req,res,next)=>{
    const book = await Book.findByIdAndDelete(req.params.id).exec()
    res.send({
        deleted_book_info : book,
    })
})
