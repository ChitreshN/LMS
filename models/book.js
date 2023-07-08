const mongoose = require('mongoose')
const schema = mongoose.Schema

const book_schema = new schema({
    title : {type : String, required : true},
    course: {type: schema.Types.ObjectId, ref: "Course", required:true},
    link  : {type: String},
})

module.exports = mongoose.model("Book",book_schema)
