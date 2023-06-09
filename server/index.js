import express from "express";
import mongoose from "mongoose";
import mong from "./mongo.js";
import path from "path";
import bodyParser from "body-parser";
import authRouter from "./routers/auth.js"
import homeRouter from "./routers/home.js"
import prodRouter from "./routers/products.js"
import editRouter from "./routers/edit.js"
import session from "express-session";
import 'dotenv/config.js';

const app = express();
const PORT =  process.env.PORT;
const __dirname = path.resolve();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "public/ejs"));
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
app.use("/edit", editRouter);

app.listen(PORT, () =>
  console.log(`Listening on http://127.0.0.1:${PORT}!`)
);