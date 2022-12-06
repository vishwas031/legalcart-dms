import { Request, Response } from "express";
import { userService } from "../../services";

export const getUserFromToken = (req: Request, res: Response) => {
  if (req.user) {
    const { user } = req;
    return res.status(200).json({ ...user.toJSON() });
  }
  return res.status(404).json({ message: "Not authorized" });
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req);
  return res.status(200).json({ ...user.toJSON() });
};
