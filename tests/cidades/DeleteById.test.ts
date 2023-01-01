import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - DeleteById", () => {
   it("Deve ser possivel excluir uma cidade", async () => {
      const res = await testeServer.post("/cidades").send({ nome: "Blumenau" });
      expect(res.statusCode).toBe(StatusCodes.CREATED);

      const resDelete = await testeServer
         .delete(`/cidades/${res.body.id}`)
         .send();
      expect(resDelete.statusCode).toBe(StatusCodes.NO_CONTENT);
   });

   it("Tenta apagar um registro que não existe", async () => {
      const res = await testeServer.delete("/cidades/9999").send();
      expect(res.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res.body).toHaveProperty("errros.default");
   });

   it("Não deve ser possivel excluir uma cidade passando uma string", async () => {
      const res = await testeServer.delete("/cidades/1b").send();
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty("errors.params.id");
   });
});
