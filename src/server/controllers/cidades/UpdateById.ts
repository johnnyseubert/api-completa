import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";

interface IParamProps {
   id?: number;
}

interface IBodyProps {
   nome: string;
}

export const updateByIdValidation = validation((getSchema) => ({
   params: getSchema<IParamProps>(
      yup.object().shape({
         id: yup.number().integer().required().moreThan(0),
      })
   ),
   body: getSchema<IBodyProps>(
      yup.object().shape({
         nome: yup.string().required().min(3),
      })
   ),
}));

export const updateById = async (req: Request<IParamProps>, res: Response) => {
   if (Number(req.params.id) === 99999) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
         errors: {
            default: "Não encontrado!",
         },
      });
   }

   return res
      .status(StatusCodes.OK)
      .send({ id: req.params.id, nome: req.body.nome });
};
