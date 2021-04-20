import express, { Application } from "express";
import mongoose, { ConnectionOptions } from "mongoose";
import cors from "cors";
import { config } from "./config";
import carRoutes from "./routes/cars";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app: Application = express();
app.use(cors(config));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoConnect = process.env.MONGO_URL || "mongodb://localhost/testecb";
const mongooseOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
console.log(typeof mongoConnect);
mongoose
  .connect(mongoConnect, mongooseOptions)
  .then(() => {
    console.log("DataBase is connected");
    app.listen(PORT, () => console.log(`Runing free 🔥 on port ${PORT}`));
  })
  .catch((error) => console.log(`Hay un error en la conexion : ${error}`));
//routes
app.use(carRoutes);
