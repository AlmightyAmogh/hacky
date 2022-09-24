const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
    title:{type:String,reuired:true},
    content:{type:String,reuired:true},
    date:{type:Date,required:true},
    assigned_by:{type:String,required:true},
    assigned_for:[{
        class:{type:String,required:true},
        year:{type:Number,required:true}
    }]
});

module.exports = mongoose.model("notice",noticeSchema);