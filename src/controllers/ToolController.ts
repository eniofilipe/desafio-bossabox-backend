import { Request, Response } from "express";
import Tool from "../schemas/Tool";

class ToolController {
  async store(req: Request, res: Response): Promise<Response> {
    const userId = res.getHeader("userId");

    const newTool = await Tool.create(req.body);

    return res.json(newTool);
  }
}

export default new ToolController();
