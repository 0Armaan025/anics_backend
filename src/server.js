import express from "express";
import cors from "cors";
import collect from "./routes/collect.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/collect", collect);

app.listen(3001, () => {
  console.log("collector running");
});
