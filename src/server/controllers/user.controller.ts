import { Router } from "express";
import { logger } from "../../utils/logger";

class UserController {
  public router = Router();

  constructor() {
    this.initializeRoutes();
    this.listRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register");
    this.router.post("/login");
  }

  private listRoutes(): void {
    const routes = this.router.stack
      .filter((r) => r.route)
      .map((r) => {
        return {
          path: Object.keys(r.route.methods),
          route: r.route.path,
        };
      });

    logger.magenta("User Routes:");
    routes.map((r) => logger.cyan(`${r.route}`));
  }
}

export default new UserController();
