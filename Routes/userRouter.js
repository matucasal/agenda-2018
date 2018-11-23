const express = require("express");
const User = require('../models/userModel');
const userRouter = express.Router();



userRouter.route('/')
    .get((req, res) => {
        User.find({}, (err, users) => {
            res.json(users)
        })
    })
    .post((req,res) => {
        let user = new User(req.body); // edited line
        console.log("Estoy en el post");
        console.log(req.body);
        user.save()
        res.status(201).send(user)
    })// end post
    
    
    
userRouter.route('/:userId')
    .get((req, res) => {
        User.findById(req.params.userId, (err, user) => {
            res.json(user)
        })
    }) // end get
    .put((req,res) => {
        User.findById(req.params.userId, (err, user) => {
            user.nombre = req.body.nombre;
            user.apellido = req.body.apellido;
            user.edad = req.body.edad;
            user.username = req.body.username;
            user.save()
            res.json(user)
        }) 
    }) // end put
    .patch((req,res)=>{
        User.findById(req.params.userId, (err, user) => {
            if(req.body._id){
                delete req.body._id;
            }
            for( let b in req.body ){
                user[b] = req.body[b];
            }
            user.save();
            res.json(user);
        })
    })// end patch
     .delete((req,res)=>{
        User.findById(req.params.userId, (err, user) => {
            user.remove(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
            })
        })
    })//end delete


module.exports = userRouter;
