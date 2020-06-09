import { Request, Response } from "express";
import Tool from "../schemas/Tool";
import mongoose, { Schema } from "mongoose";
import User from "../schemas/User";

class ToolController {
  async store(req: Request, res: Response): Promise<Response> {
    const idUser = res.getHeader("userId");

    const newTool = await Tool.create({ ...req.body, idUser });

    return res.json(newTool);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const id = res.get("idUser");
    const newUser = new User();
    newUser._id = id;
    const tag = req.query.tag;
    const tools = await Tool.find(
      tag
        ? {
            tags: tag,
            idUser: { $ne: newUser._id },
          }
        : {
            idUser: { $ne: newUser._id },
          }
    ).lean();
    return res.json(tools);
  }
}

export default new ToolController();
