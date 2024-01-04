import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connect_database from "./connection/connect_database.js";

connect_database();

const port = 1200;

app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(port, () => {
  console.log(`Active port ${port}`);
});
