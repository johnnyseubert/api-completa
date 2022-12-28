import { RequestHandler } from "express";
import { SchemaOf, ValidationError } from "yup";

type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T>(schema: SchemaOf<T>) => SchemaOf<T>;

type TAllSchemas = Record<TProperty, SchemaOf<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => {
   const schemas = getAllSchemas((schema) => schema);

   return async (req, res, next) => {
      let errorsResult: Partial<Record<TProperty, Record<string, string>>> = {};

      Object.entries(schemas).forEach(([key, schema]) => {
         try {
            schema.validateSync(req[key as TProperty], { abortEarly: false });
         } catch (error) {
            const yupError = error as ValidationError;
            const errors: Record<string, string> = {};

            yupError.inner.forEach((err) => {
               if (err.path === undefined) return;
               errors[err.path] = err.message;
            });

            errorsResult[key as TProperty] = errors;
         }
      });

      if (Object.entries(errorsResult).length > 0) {
         return res.status(400).json(errorsResult);
      }

      return next();
   };
};
