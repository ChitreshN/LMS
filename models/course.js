const mongoose = require('mongoose')
const schema   = mongoose.Schema

const course_schema = new schema({
    title : {type : String, required : true},
    summary: {type : String, required: true},
    assignments : [{type : schema.Types.ObjectId, ref : "Assignment"}],
    books : [{type : schema.Types.ObjectId, ref: "Book"}],
})

course_schema.virtual('url').get(function (){
    return `/catalog/courses/${this._id}`
})

module.exports = mongoose.model('Course',course_schema)
