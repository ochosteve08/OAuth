import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./route/user.route.js";
import authRoute from "./route/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger, logEvents } from "./middleware/logger.js";
import morgan from 'morgan'
dotenv.config();



const app = express();
const port = 3500;
app.use(cookieParser());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err);
  });


  app.get('/',(req,res)=>{
    res.json({message: "working"})
  })

  morgan.token("id", function getId(req) {
    return req.id;
  });
  const stream = {
    write: (message) => logEvents(message.trim(), "httpRequest.log"), // Here, 'httpRequest.log' is the file name where you want to store HTTP request logs
  };
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms", {
      stream,
    })
  );


app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

app.use(logger);

app.use("/user", userRoute);
app.use("/auth", authRoute);

app.use((err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${
      req.headers.origin || "Origin not provided"
    }${JSON.stringify(req.cookies)}\t`,
    "errLog.log"
  );
 
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
    message,
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);

  const errno = error.errno || "N/A";
  const code = error.code || "N/A";
  const codeName = error.codeName || "N/A";
  const syscall = error.syscall || "N/A";
  const hostname = error.hostname || "N/A";
  const ok = error.ok || "N/A";
  const connectionGeneration = error.connectionGeneration || "N/A";

  const errorMessage = `Errno:${errno}\tCode:${code}\tCodeName:${codeName}\tSyscall:${syscall}\tHostname:${hostname}\tOK:${ok}\tConnectionGeneration:${connectionGeneration}\t`;

  logEvents(errorMessage, "mongoErrorLog.log");
});
