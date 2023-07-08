const mongoose = require('mongoose')
const schema   = mongoose.Schema

const course_schema = new schema({
    title : {type : String, required : true},
    summary: {type : String, required: true},
    status : {type : String, required : true, enum : ["In Progress","Not Started","Completed"], default : "Not Started"},
    assignments : [{type : schema.Types.ObjectId, ref : "Assignment"}],
    books : [{type : schema.Types.ObjectId, ref: "Book"}],
})

course_schema.virtual('url').get(function (){
    return `/catalog/course/${this._id}`
})

module.exports = mongoose.model('Course',course_schema)
