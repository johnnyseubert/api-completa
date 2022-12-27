import cors from "cors";
import express from "express";
import { routes } from "./routes";

export const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/v1", routes);
