import express from "express";
import cors from "cors";
import { routes } from "./routes";
import "./shared/services/TranslationsYup";

export const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/v1", routes);
