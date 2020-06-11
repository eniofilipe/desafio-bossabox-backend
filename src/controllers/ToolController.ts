import { Request, Response } from "express";
import Tool from "../schemas/Tool";
import User from "../schemas/User";

class ToolController {
  async store(req: Request, res: Response): Promise<Response> {
    const idUser = res.getHeader("idUser");

    const newTool = await Tool.create({ ...req.body, idUser });

    return res.status(201).json(newTool);
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
          idUser: { $eq: newUser._id },
        }
        : {
          idUser: { $eq: newUser._id },
        }
    ).lean();
    return res.json(tools);
  }

  async delete(req: Request, res: Response): Promise<Response> {

    const tool = new Tool();
    tool._id = req.params.id;

    const deleteTool = await Tool.findByIdAndDelete(tool._id);

    if (!deleteTool) {
      return res.status(400).json();
    }

    return res.status(204).json();
  }
}

export default new ToolController();
