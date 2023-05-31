const express = require("express");
const app = express();
const mongoose = require("mongoose");

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
        console.log(`Example app listening on port ${PORT}!`)
      );
    } catch (e) {
      console.log(e);
    }
  }
  
  startApp();

app.get('/', (req, res) => {
res.send('Hello World!');
});

// app.listen(PORT, () =>{
//     console.log("running server on 127.0.0.1:8888");
// })