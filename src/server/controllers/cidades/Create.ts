import { Request, Response } from "express";
import * as yup from "yup";

interface ICidade {
   nome: string;
   estado: string;
}

const bodyValidation: yup.SchemaOf<ICidade> = yup.object().shape({
   nome: yup.string().required().min(3),
   estado: yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
   let validatedData: ICidade | undefined = undefined;

   try {
      validatedData = await bodyValidation.validate(req.body, {
         abortEarly: false,
      });
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

   return res.send();
};
