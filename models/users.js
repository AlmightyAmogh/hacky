const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    username:{type: String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    name:{type:String,required:true},
    teaches:[{
      subject:{type:String},
      year:{type:Number},
      branch:{type:String}
    }],
    reminders:[{
      title:{type:String},
      date:{type:Date}
    }],

    rollno:{type:Number},
    year:{type:Number},
    branch:{type:String},
    batch:{type:String},
    classnumber:{type:String},
    subject:[{
      subname:{type:String},
      attendance:{type:String},
      marks:[{
        pt1:{type:Number},
        pt2:{type:Number},
        sem:{type:Number}
      }]
    }
    ]
});

module.exports = mongoose.model("student",studentSchema);