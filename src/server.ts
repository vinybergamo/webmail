import express, { Application, Request, Response } from "express";
import { json } from "body-parser";
import dotenv from "dotenv";

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.app.use(json());
    dotenv.config();
  }

  private middleware(): void {}

  private routes(): void {}

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default new Server();
