// const express = require("express");
// const mongoose = require("mongoose");
import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";

const app = express();
app.use(express.static('public'));
const PORT = 7777;
const __dirname = path.resolve();
// var jsonParser = bodyParser.json()
// const ATLAS_DB = "mongodb+srv://db_user:dIwFUTTmvkTei4yK@cluster0.qbru6uc.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connect(ATLAS_DB, 
//       {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//       }
// ).then(() => {
//     console.log("project folder " + __dirname);
// })
// .catch((e) => {console.log(e)});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () =>
  console.log(`Listening on http://127.0.0.1:${PORT}!`)        
);

app.get('/', (req, res) => {
  // console.log(res);
  console.log("req.body is " + req.body);
  console.log("req.query is " + req.query);
  res.set('Content-Type', 'text/html');
  res.sendFile(__dirname + "/index.html");
  console.log(req.query);
});
// app.post("/auth/login", jsonParser, (request, response) => {
  app.post("/auth/login", (request, response) => {
  // request.sessi
  console.log(request.body);
  // console.log(response);
  response.json({boba:45});
  });
  
// app.listen(PORT, () =>{
//     console.log("running server on 127.0.0.1:8888");
// })