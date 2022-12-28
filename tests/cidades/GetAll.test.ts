import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - GetAll", () => {
   it("Deve ser possivel buscar todos os registros", async () => {
      const res = await testeServer.post("/cidades").send({ nome: "Blumenau" });
      expect(res.statusCode).toBe(StatusCodes.CREATED);

      const resBuscada = await testeServer.get("/cidades").send();
      expect(Number(resBuscada.headers["x-total-count"])).toBeGreaterThan(0);
      expect(resBuscada.statusCode).toBe(StatusCodes.OK);
      expect(resBuscada.body.length).toBeGreaterThan(0);
   });
});
