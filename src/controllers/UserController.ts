import { Request, Response } from "express";
import User from "../schemas/User";

class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const checkUser = await User.findOne({ email: email }).lean();

    if (checkUser) {
      return res.status(400).json("User Exists");
    }

    const newUser = await User.create(req.body);

    return res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  }
}

export default new UserController();
