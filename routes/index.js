const bcrypt = require('bcryptjs');
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const router = express.Router();
const passport =require("passport");
const {checkAuthentication,checkLogin} = require("../config/authentication");
const User = require("../models/users");

router.get(
    "/",
    (req,res) =>{
        res.render("homepage", {user:req.user});
    }
)

router.get(
    "/login",
    checkLogin,
    (req,res)=>{
        res.render("login")

    }
)

router.post(
    "/login",
    checkLogin,
    (req,res,next) =>{
        passport.authenticate
        (
            'local',
            {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true
            }
        )(req, res, next);
        req.session.loggedin = true
    }

)

router.get(
    "/studentSignup",
    checkLogin,
    (req,res) =>{
        res.render("studentSignup");
    }
)

router.get(
  "/teacherSignup",
  checkLogin,
  (req,res) =>{
      res.render("teacherSignup");
  }
)

router.post(
    "/studentSignup",
    checkLogin,
    (req,res,next) => {
        const {username,email,password,name,roll_no,year,branch,classnumber,batch} = req.body;

        let signupErrors = []

        if (!username)
            signupErrors.push("username")
        if (!password)
            signupErrors.push("password")
        if (!email)
            signupErrors.push("email")
        if (!name)
            signupErrors.push("name")
        if (!roll_no || roll_no=='0')
            signupErrors.push("roll-no")
        if (!year || year=='0')
            signupErrors.push("year")
        if (!branch)
            signupErrors.push("branch")
        if (!classnumber)
            signupErrors.push("classnumber")
        if (!batch)
            signupErrors.push("batch")

        if (signupErrors.length>0)
            res.render(
                "studentSignup",
                {
                    username,
                    email,
                    password,
                    name
                }
            );

        else{
            User.findOne(
                {
                    email:email
                }
            ).then(
                (user) => {
                    if (user){
                        signupErrors.push("An account with that email exists")
                        res.render(
                            "studentSignup",
                            {
                              username,email,password,name,roll_no,year,branch,classnumber,batch
                            }
                        );
                    }
                    else{
                        const newUser = new User
                        (
                            {
                              username,email,password,name,roll_no,year,branch,classnumber,batch
                            }
                        )

                        bcrypt.hash(
                            newUser.password,
                            10,
                            (err,hash) => {
                                if(err)
                                    throw err;

                                newUser.password = hash;
                                newUser.save().then(
                                    (user,req) => {
                                        res.redirect("/studentLogin")
                                    }
                                )
                            }
                            );
                    }


                }
            )
        }
    }
)

router.post(
  "/teacherSignup",
  checkLogin,
  (req,res,next) => {
      const {username,email,password,name,teaches} = req.body;

      let signupErrors = []

      if (!username)
          signupErrors.push("username")
      if (!password)
          signupErrors.push("password")
      if (!email)
          signupErrors.push("email")
      if (!name)
          signupErrors.push("name")

      if (signupErrors.length>0)
          res.render(
              "studentSignup",{
                  username,
                  email,
                  password,
                  name
              }
          );

      else{
          User.findOne(
              {
                  email:email
              }
          ).then(
              (user) => {
                  if (user){
                      errors.push("An account with that email exists")
                      res.render(
                          "studentSignup",
                          {
                            username,email,password,name,teaches
                          }
                      );
                  }
                  else{
                      const newUser = new User
                      (
                          {
                            username,email,password,name,teaches
                          }
                      )

                      bcrypt.hash(
                          newUser.password,
                          10,
                          (err,hash) => {
                              if(err)
                                  throw err;

                              newUser.password = hash;
                              newUser.save().then(
                                  (user,req) => {
                                      res.redirect("/studentLogin")
                                  }
                              )
                          }
                          );
                  }


              }
          )
      }
  }
)

router.get(
    '/logout',
    checkAuthentication,
    (req, res) =>
    {
        req.logOut();
        res.redirect("/");
    }
)

router.get(
    '/logout',
    checkAuthentication,
    (req, res) =>
    {
        req.logOut();
        res.redirect("/");
    }
)
module.exports = router;