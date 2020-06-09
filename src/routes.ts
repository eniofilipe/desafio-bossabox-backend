import { Router } from "express";

import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import ToolController from "./controllers/ToolController";
import authMiddleware from "./middlewares/auth";

const routes = Router();

routes.post("/user", UserController.store);
routes.post("/session", SessionController.store);

routes.use(authMiddleware);
routes.post("/tool", ToolController.store);

routes.get("/tool", ToolController.index);

routes.delete("/tool/:id", ToolController.delete);

export default routes;
