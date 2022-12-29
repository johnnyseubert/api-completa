import { ICidade } from "../../models";

declare module "knex/types/tables" {
   interface Tables {
      cidade: ICidade; // Serve para quando for usar o knex ter autocomplete
   }
}
