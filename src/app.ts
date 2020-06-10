import * as dotenv from "dotenv";
import express from "express";
import routes from "./routes";
import cors from "cors";
dotenv.config();

import mongoConnect from "./config/database";

mongoConnect();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

export default app;
