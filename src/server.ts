import express, { Application, Request, Response } from "express";
import { json } from "body-parser";
import dotenv from "dotenv";
import { logger } from "./utils/logger";
import userController from "./server/controllers/user.controller";

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.app.use(json());
    this.routes();
    dotenv.config();
  }

  private middleware(): void {}

  private routes(): void {
    this.app.use(userController.router);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      logger.yellow(`Server is running on port ${port}`);
    });
  }
}

export default new Server();
