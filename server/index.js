import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import authRouter from "./routers/auth.js"
import homeRouter from "./routers/home.js"

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 7777;
const __dirname = path.resolve();

// const ATLAS_DB = "mongodb+srv://db_user:dIwFUTTmvkTei4yK@cluster0.qbru6uc.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connect(ATLAS_DB, 
//       {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//       }
// ).then(() => {
//     console.log("project folder " + __dirname);
// })
// .catch((e) => {console.error(e)});

app.use("/", homeRouter);
app.use("/auth", authRouter);

app.listen(PORT, () =>
  console.log(`Listening on http://127.0.0.1:${PORT}!`)
);