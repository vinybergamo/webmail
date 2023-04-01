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
    this.router.post("/login", this.userService.login);
  }

  private listRoutes(): void {
    const routes = this.router.stack
      .filter((r) => r.route)
      .map((r) => {
        return {
          path: Object.keys(r.route.methods)[0].toUpperCase(),
          name: r.route.stack[0].name,
          route: r.route.path,
        };
      });

    logger.magenta("User Routes:");
    routes.map((r) => logger.cyan(`${r.name} ${r.path} ${r.route}`));
  }
}

export default new UserController();
