import express from 'express';
import cors from 'cors';
import {store, fetchAll} from './user-crud.js';
let app = express();
// middleware to read json & handle cors
app.use(express.json()); // reads json from the request
app.use(cors()); // takes requests from any origin
// start the server
app.listen(9999, ()=>console.log('Server running in 9999'));
// store
app.post('/users', async (request, response)=>{
    let data = request.body; // extract the json data from the request body
    console.log(data);
    try { 
        let result = await store(data);
        response.status(200).json({"message":`Stored id is: ${result.insertId}`});
    } catch(err) {
        console.log(err);
        response.status(401).json({"error":"Store failed"});
    }
});
// fetchAll
app.get('/users', async (request, response)=>{
    let result = await fetchAll();
    response.status(200).json(result);
});
// get the login data
app.get('/users/login', (request, response)=>{
    let auth = request.headers.authorization;
    console.log("Encoded String: "+auth);
    //console.log("Decoded String:" +atob(auth));
    response.json({"message":"HELLO WORLD"});
})
