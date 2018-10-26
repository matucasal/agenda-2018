const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');


const db = mongoose.connect('mongodb://localhost:27017/mydb');
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 5656;
// routes go here

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
/*
//cargo body parser
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())*/


app.post('/endpoint', (req, res) => {
  console.log(req.body)
})

//utilizo el router de books - prueba
//const bookRouter = require("./Routes/bookRouter");
//app.use('/api/Books', bookRouter);

//utilizo el router de events - 
const eventRouter = require("./Routes/eventRouter");
app.use('/api/Events', eventRouter);

//utilizo el router de user - 
const userRouter = require("./Routes/userRouter");
app.use('/api/Users', userRouter);