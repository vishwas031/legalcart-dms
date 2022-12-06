import { Response } from "express";
import UserModel from "../../database/models/user";
import { ICompanyAndUserCreateRequest } from "src/interfaces/admin";
import { authService } from "../../services";

export const createCompanyAndUser = async (
  req: ICompanyAndUserCreateRequest,
  res: Response
) => {
  const { email, password, name, logo } = req.body;

  if (!email || !password || !name || !logo) {
    return res.status(422).json({ message: "All fields must be provided" });
  }

  let existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(422).json({ message: "Email is already in use." });
  }
  const company = await authService.createCompanyAndUser(req);
  return res.status(200).json({ ...company });
};
