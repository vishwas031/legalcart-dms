import { Request, Response } from "express";
import CompanyModel from "../../database/models/company";

export async function getSelfCompany(req: Request, res: Response) {
  const company = await CompanyModel.findOne({ _id: req.user?._id });
  if (company) return res.status(200).json({ ...company.toJSON() });
}
