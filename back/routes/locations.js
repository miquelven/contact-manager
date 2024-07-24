// routes/location.js
import express from "express";
import { getLocation, updateLocation } from "../controllers/location.js";

const routerLocation = express.Router();

routerLocation.get("/location/:id", getLocation);
routerLocation.put("/:id", updateLocation);

export default routerLocation;
