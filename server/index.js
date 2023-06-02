// const express = require("express");
// const mongoose = require("mongoose");
import express from "express";
import mongoose from "mongoose";
import path from "path";

const app = express();
app.use(express.static('public'));
const PORT = 7777;
const __dirname = path.resolve();
const ATLAS_DB = "mongodb+srv://db_user:dIwFUTTmvkTei4yK@cluster0.qbru6uc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(ATLAS_DB, 
      {
      useNewUrlParser: true,
      useUnifiedTopology: true
      }
).then(() => {
    console.log(__dirname)
})
.catch((e) => {console.log(e)});

app.listen(PORT, () =>
  console.log(`Listening on http://127.0.0.1:${PORT}!`)        
);

app.get('/', (req, res) => {
  console.log(res);
  res.set('Content-Type', 'text/html');
  res.sendFile(__dirname + "/index.html");
});

// app.listen(PORT, () =>{
//     console.log("running server on 127.0.0.1:8888");
// })