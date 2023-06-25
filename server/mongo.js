import mongoose from "mongoose";
import path from "path";

const __dirname = path.resolve();

// Configuration 

const ATLAS_DB = "mongodb+srv://db_user:dIwFUTTmvkTei4yK@cluster0.qbru6uc.mongodb.net/smartphome?retryWrites=true&w=majority";

mongoose.connect(ATLAS_DB, 
      {
      useNewUrlParser: true,
      useUnifiedTopology: true
      }
).then(() => {
    // console.log("project folder " + __dirname);
    console.log("Connected to Atlas");
    // console.log(mongoose.connection);
    // const db = mongoose.connection;
    // console.log('Назва бази даних:', db.name);
    // console.log('URL бази даних:', db.host);
    // console.log('Порт бази даних:', db.port);
})
.catch((e) => {console.error(e)});

export default mongoose;