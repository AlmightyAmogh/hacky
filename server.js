const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const session = require("express-session");
const passport = require("passport");
require("./config/passport")(passport);
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const app = express();


const bodyparser=require("body-parser");
const ejs=require("ejs");


const expressLayouts = require("express-ejs-layouts");

//Database connection
const db = "mongodb+srv://sahil:zfsjoy%405mRqR@cluster0.v4uqg.mongodb.net/Hackathon?retryWrites=true&w=majority";
mongoose.connect(db)
.then(
    () => console.log("Connected to MongoDB Atlas")
).catch(
    (e) => console.log(e)
);

const conn = mongoose.connection;

// Middleware
app.use(express.json());
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("static"));

//express session
app.use
(
    session
    (
        {
            secret: "hBvUYUhobHJTYIGouihjH",
            resave: true,
            saveUninitialized: true
        }
    )
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", require("./routes/index"));
// app.use("/reminder", require("./routes/reminder"));
// app.use("/marks", require("./routes/marks"));
// app.use("/notice", require("./routes/notice"));

//Connection to port
const PORT = process.env.PORT || 6969;
app.listen
(
    PORT,
    (err) =>{
        if(err)
            throw err;
        console.log(`Server started on PORT ${PORT}...`);
    }
);