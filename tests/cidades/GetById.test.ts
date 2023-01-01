import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - GetById", () => {
   it("Deve ser possivel buscar o registro pelo id", async () => {
      const criar = await testeServer
         .post(`/cidades`)
         .send({ nome: "Blumenau" });

      const res = await testeServer.get(`/cidades/${criar.body.id}`).send();
      expect(res.statusCode).toEqual(StatusCodes.OK);
      expect(res.body).toHaveProperty("nome");
   });

   it("Tenta buscar registro que Não existe", async () => {
      const res = await testeServer.get("/cidades/99999").send();
      expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res.body).toHaveProperty("errors.default");
   });
});
