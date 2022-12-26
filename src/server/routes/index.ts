import { Router } from "express";
import { StatusCodes } from "http-status-codes";

export const routes = Router();

routes.get("/", (req, res) => {
   res.status(StatusCodes.OK).send("Hello World!");
});
