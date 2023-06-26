import mongoose from "mongoose";
import path from "path";

const __dirname = path.resolve();

const ATLAS_DB = "mongodb+srv://db_user:dIwFUTTmvkTei4yK@cluster0.qbru6uc.mongodb.net/smartphome?retryWrites=true&w=majority";

mongoose.connect(ATLAS_DB, 
      {
      useNewUrlParser: true,
      useUnifiedTopology: true
      }
).then(() => {
    console.log("Connected to Atlas");
})
.catch((e) => {console.error(e)});

export default mongoose;