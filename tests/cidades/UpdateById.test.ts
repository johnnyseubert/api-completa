import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - UpdateById", () => {
   it("Deve ser possivel atualizar o registro pelo id", async () => {
      const criar = await testeServer
         .post(`/cidades`)
         .send({ nome: "Blumenau" });

      const atualizar = await testeServer
         .put(`/cidades/${criar.body.id}`)
         .send({ nome: "Itajai" });

      expect(atualizar.statusCode).toEqual(StatusCodes.OK);
      expect(atualizar.body).toHaveProperty("nome");
   });

   it("Não deve ser possivel atualizar um registro que nao existe", async () => {
      const atualizar = await testeServer
         .put("/cidades/99999")
         .send({ nome: "Itajai" });

      expect(atualizar.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(atualizar.body).toHaveProperty("errors.default");
   });
});
