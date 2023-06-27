import express from "express";
import mongoose from "mongoose";
import mong from "./mongo.js";
import path from "path";
import bodyParser from "body-parser";
import authRouter from "./routers/auth.js"
import homeRouter from "./routers/home.js"
import prodRouter from "./routers/products.js"
import session from "express-session";

const app = express();
const PORT = 7777;
const __dirname = path.resolve();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "public/ejs"));
// app.set("views", __dirname + "/public/ejs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({limit: '5mb'}));

app.use(
  session({
    secret: "smartphome-cookies-secret",
    cookie: {
      httpOnly: true,
    },
    saveUninitialized: false,
    resave: false,
  })
);
app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/products", prodRouter);

app.listen(PORT, () =>
  console.log(`Listening on http://127.0.0.1:${PORT}!`)
);