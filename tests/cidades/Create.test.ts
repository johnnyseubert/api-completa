import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - Create", () => {
   it("deve ser possivel criar uma nova cidade", async () => {
      const res1 = await testeServer.post("/cidades").send({
         nome: "Blumenau",
      });

      expect(res1.statusCode).toBe(StatusCodes.CREATED);
      expect(typeof res1.body).toBe("number");
   });

   it("não deve ser possivel criar uma cidade com nome menor que 3 caracteres", async () => {
      const res2 = await testeServer.post("/cidades").send({
         nome: "Bl",
      });

      expect(res2.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res2.body).toHaveProperty("errors.body.nome");
   });
});
