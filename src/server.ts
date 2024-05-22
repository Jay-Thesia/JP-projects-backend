import express, { Express, Request, Response } from "express";
import { PORT } from "./config/env.config";
import router from "./index.router";
import { logger } from "./config/logger.config";
import cors from 'cors';
import('./config/mongodb.config')
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({ credentials: true, origin: true }))
app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
  logger.info(`[server]: Server is running at http://localhost:${PORT}`);
});