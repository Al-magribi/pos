import express from "express";
const app = express();

import bodyParser from "body-parser";
import cors from "cors";
import FoodsRoutes from "./routes/FoodsRoutes.js";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/food", FoodsRoutes);

export default app;
