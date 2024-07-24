import express from "express";
import cors from "cors";
import useRoutes from "./routes/contacts.js";
import useRoutesLocation from "./routes/locations.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", useRoutes);
app.use("/", useRoutesLocation);

app.listen(8800);
