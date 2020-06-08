import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import auth from "../config/auth";
import * as bcrypt from "bcryptjs";
import User from "../schemas/User";

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).lean();

    if (!user) {
      return res
        .status(401)
        .json("User not exists" + ": " + email + ": " + password);
    }

    const compare = bcrypt.compareSync(password, user.password);

    if (!compare) {
      return res.status(400).json("Password dos not match");
    }

    const token = jwt.sign({ id: user._id }, auth.secret, {
      expiresIn: auth.expiresIn,
    });

    return res.json({
      user: {
        id: user._id,
        name: user.name,
      },
      token,
    });
  }
}

export default new SessionController();
