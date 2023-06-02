// const express = require("express");
// const mongoose = require("mongoose");
import express from "express";
import mongoose from "mongoose";
import path from "path";

const app = express();
const PORT = 7777;
const ATLAS_DB = "mongodb+srv://db_user:dIwFUTTmvkTei4yK@cluster0.qbru6uc.mongodb.net/?retryWrites=true&w=majority";



async function startApp() {
    try {
      await mongoose.connect(ATLAS_DB, 
            {
            useNewUrlParser: true,
            useUnifiedTopology: true
            });
      app.listen(PORT, () =>
        console.log(`Listening on http://127.0.0.1:${PORT}!`)
      );
    } catch (e) {
      console.log(e);
    }
  }
  
  startApp();

  const __dirname = path.resolve();
app.get('/', (req, res) => {
  console.log(res);
  res.set('Content-Type', 'text/html');
  // console.log(__dirname + "/index.html");
  res.sendFile(__dirname + "/index.html");
  // res.render(__dirname + "/index.html");
});
app.get('/css/style.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(__dirname + '/css/style.css');
});
// app.listen(PORT, () =>{
//     console.log("running server on 127.0.0.1:8888");
// })