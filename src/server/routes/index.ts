import { Router } from "express";
import { CidadesController } from "../controllers";

export const routes = Router();

routes.get(
   "/cidades",
   CidadesController.getAllValidation,
   CidadesController.getAll
);

routes.post(
   "/cidades",
   CidadesController.createValidation,
   CidadesController.create
);
