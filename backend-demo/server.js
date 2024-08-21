// to use es6 syntax for importing - import express from 'express'
// supports let express = requrie('express')
import express from 'express';
import cors from 'cors';
// create object of express that gives you http methods & listen
let app = express();
//middleware to handle CORS request 
app.use(cors());
//middleware to handle JSON data from the request
app.use(express.json());//can read JSON from the request body
//an array of user data
let users = [{id:100, name:"Alex"},{id:200,name:"Brad"}];
//create a webservice to handle HTTP GET
// url can be /users/100, /users/200 and so on
app.get('/users/:id', (request, response) => { 
    let id = request.params.id; // reads id in text format
    for(let u of users) {
        if(u.id==parseInt(id)) {
            response.status(200).json(u); // send user in json
        }
    }
    // in case if is never executed
    response.status(404).json({message:`Sorry id ${id} not found` });
});
//start the server
app.listen(8888, ()=>console.log('Server is running in 8888'));