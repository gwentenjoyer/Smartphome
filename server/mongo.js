import mongoose from "mongoose";
import path from "path";
import 'dotenv/config.js';

const __dirname = path.resolve();

mongoose.connect(process.env.ATLAS_DB, 
      {
      useNewUrlParser: true,
      useUnifiedTopology: true
      }
).then(() => {
    console.log("Connected to Atlas");
})
.catch((e) => {console.error(e)});

export default mongoose;