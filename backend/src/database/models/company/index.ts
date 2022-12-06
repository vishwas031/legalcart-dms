import { model } from "mongoose";
import { ICompanyModel } from "src/interfaces/company";
import { BaseSchema } from "../base";

const CompanySchema = new BaseSchema(
  {
    name: { type: String, trim: true, required: true },
    logo: { type: String, trim: true, required: true },
    about: { type: String, required: false, default: null },
  },
  {
    versionKey: false,
  }
);

const CompanyModel = model<ICompanyModel>("Company", CompanySchema);

export default CompanyModel;
