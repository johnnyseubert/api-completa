import { Router } from "express";
import { CidadesController } from "../controllers";

export const routes = Router();

routes.post(
   "/cidades",
   CidadesController.middlewareValidations,
   CidadesController.create
);
