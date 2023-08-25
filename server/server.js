import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3500;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('connected to mongodb');
})
.catch((err)=>{
    console.log('error connecting to mongodb', err);
})

app.listen(port, () => {
  console.log(`listening on port:${port}`);
});
