const express = require("express");
const Event = require('../models/eventModel');
const eventRouter = express.Router();
const User = require('../models/userModel');





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
    


    
/*
app.post('/upload', function(req, res) {
   // the uploaded file object
});*/

    
eventRouter.route('/:eventId')
    .get((req, res) => {
        Event.findById(req.params.eventId, (err, event) => {
            res.json(event)
        })
    }) // end get
    .put((req,res) => {
        Event.findById(req.params.eventId, (err, event) => {
            //cargo todos los datos del evento
            event.nombre = req.body.nombre;
            event.direccion = req.body.direccion;
            event.fecha = req.body.fecha;
            event.foto = req.body.foto;
            event.precio =   req.body.precio;
            event.descripcion =   req.body.descripcion;
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


    //agrego user en un evento
    eventRouter.route('/:eventId/:userId')
    .post((req, res) => {
        console.log("llegue al post de asistir");
        Event.findById(req.params.eventId, (err, event) => {
            //uso el addtoset para evitar que se dupliquen los asistir
            event.users.addToSet(req.params.userId);
            event.save();
            res.json(event);
        })
    })
    
    //listo users en el evento
    eventRouter.route('/:eventId/users')
    .get((req, res) => {
        
        Event.findById(req.params.eventId)
        .populate('users')
        .exec(function (err, users) {
            console.log(users);
            //console.log(users.users);
            //tendria que iterar users.users y armar un json piola
            var users_array =  [];
            for (var i =0; i< users.users.length ; i++){
                //users_array.push (id1: 100)
                users_array.push({nombre : users.users[i].nombre, apellido : users.users[i].apellido});
            }
            //res.json({"nombre": users.users.nombre, "apellido": users.users.apellido});
            //res.json(users.nombre);
            res.json (users_array);
        })
        })
        
        
        
        
        
        /*
        Event.findById(req.params.eventId, (err, event) => {
            res.json(event)
        })*/

module.exports = eventRouter;
