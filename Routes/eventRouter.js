const express = require("express");
const Event = require('../models/eventModel');
const eventRouter = express.Router();



eventRouter.route('/')
    .get((req, res) => {
        Event.find({}, (err, events) => {
            res.json(events)
        })
    })
    .post((req,res) => {
        let event = new Event(req.body); // edited line
        console.log("Estoy en el post");
        console.log(req.body);
        event.save()
        res.status(201).send(event)
    })// end post
    
    
    
eventRouter.route('/:eventId')
    .get((req, res) => {
        Event.findById(req.params.eventId, (err, event) => {
            res.json(event)
        })
    }) // end get
    .put((req,res) => {
        Event.findById(req.params.eventId, (err, event) => {
            event.nombre = req.body.nombre;
            event.direccion = req.body.direccion;
            event.fecha = req.body.fecha;
            event.save()
            res.json(event)
        }) 
    }) // end put
    .patch((req,res)=>{
        Event.findById(req.params.eventId, (err, event) => {
            if(req.body._id){
                delete req.body._id;
            }
            for( let b in req.body ){
                event[b] = req.body[b];
            }
            event.save();
            res.json(event);
        })
    })// end patch
     .delete((req,res)=>{
        Event.findById(req.params.eventId, (err, event) => {
            event.remove(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
            })
        })
    })//end delete


module.exports = eventRouter;
