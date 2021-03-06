require("dotenv").config();
const mongoose = require("mongoose");
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter/userRouter";
import postRouter from "./routes/postRouter";
import errorMiddleWare from "./middlewares/errorMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,

  })
);
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use(errorMiddleWare);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`works on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
