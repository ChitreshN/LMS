const mongoose = require('mongoose') 

const schema = mongoose.Schema

const assignment_schema = new schema({
    details : {type : String, required : true, maxlength : 200},
    date_announced : {type : Date, required : true},
    date_due : {type : Date, required : true},
    material : {type : String},
    status : {type : String, required : true, enum : ["Done","Incomplete"]},
    course : {type: schema.Types.ObjectId, ref : 'Course', required : true}
})

assignment_schema.virtual('url').get(function (){
    return `/catalog/assignment/${this._id}`
})

module.exports = mongoose.model('Assignment',assignment_schema)
