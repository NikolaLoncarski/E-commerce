import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import morgan from "morgan";
import { errorHandler, notFound } from "./util/errorMIddleware.js";
import cors from "cors";

import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api/item", itemRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
