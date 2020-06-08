import { Request, Response } from "express";
import User from "../schemas/User";

class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const newUser = await User.create(req.body);

    return res.json(newUser);
  }
}

export default new UserController();
