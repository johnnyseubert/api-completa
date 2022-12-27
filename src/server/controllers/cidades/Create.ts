import { NextFunction, Request, RequestHandler, Response } from "express";
import * as yup from "yup";

interface ICidade {
   nome: string;
   estado: string;
}

const bodyValidation: yup.SchemaOf<ICidade> = yup.object().shape({
   nome: yup.string().required().min(3),
   estado: yup.string().required().min(3),
});

export const middlewareCreateBodyValidator: RequestHandler = async (
   req,
   res,
   next
) => {
   try {
      await bodyValidation.validate(req.body, {
         abortEarly: false,
      });
      next();
   } catch (error) {
      const yupError = error as yup.ValidationError;

      return res.status(400).json({
         erros: yupError.inner.map((e) => {
            return {
               campo: e.path,
               mensagem: e.message,
            };
         }),
      });
   }
};

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
   req.body;

   return res.send();
};
