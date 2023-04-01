import { Router } from "express";
import { logger } from "../../utils/logger";
import userService, { IUserService } from "../services/user.service";

class UserController {
  public router = Router();

  private userService: IUserService;

  constructor() {
    this.userService = userService;
    this.initializeRoutes();
    this.listRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", this.userService.register);
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
