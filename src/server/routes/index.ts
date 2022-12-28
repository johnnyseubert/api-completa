import { Router } from "express";
import { CidadesController } from "../controllers";

export const routes = Router();

routes.get(
   "/cidades",
   CidadesController.getAllValidation,
   CidadesController.getAll
);

routes.get(
   "/cidades/:id",
   CidadesController.getByIdValidation,
   CidadesController.getById
);

routes.post(
   "/cidades",
   CidadesController.createValidation,
   CidadesController.create
);

routes.put(
   "/cidades/:id",
   CidadesController.updateByIdValidation,
   CidadesController.updateById
);

routes.delete(
   "/cidades/:id",
   CidadesController.deleteByIdValidation,
   CidadesController.deleteById
);
