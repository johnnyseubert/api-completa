import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";

interface IQueryProps {
   page?: number;
   limit?: number;
   filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
   query: getSchema<IQueryProps>(
      yup.object().shape({
         page: yup.number().notRequired().moreThan(0),
         limit: yup.number().notRequired().moreThan(0),
         filter: yup.string().notRequired(),
      })
   ),
}));

export const getAll = async (
   req: Request<{}, {}, {}, IQueryProps>,
   res: Response
) => {
   res.setHeader("Access-Control-Expose-Headers", "x-total-count");
   res.setHeader("x-total-count", 1);
   return res.status(StatusCodes.OK).json([
      {
         id: 1,
         nome: "Blumenau",
      },
   ]);
};
