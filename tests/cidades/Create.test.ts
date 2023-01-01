import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - Create", () => {
   it("Deve ser possivel criar uma nova cidade", async () => {
      const res = await testeServer.post("/cidades").send({
         nome: "Blumenau",
      });

      expect(res.statusCode).toBe(StatusCodes.CREATED);
      expect(typeof res.body.id).toBe("number");
   });

   it("Não deve ser possivel criar uma cidade com nome menor que 3 caracteres", async () => {
      const res = await testeServer.post("/cidades").send({
         nome: "Bl",
      });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty("errors.body.nome");
   });

   it("Não deve ser possivel criar uma cidade sem informar o nome", async () => {
      const res = await testeServer.post("/cidades").send({});
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty("errors.body.nome");
   });

   it("Não deve ser possivel criar uma cidade informando um numero no nome", async () => {
      const res = await testeServer.post("/cidades").send({ nome: 1 });
      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body).toHaveProperty("errors.body.nome");
   });
});
