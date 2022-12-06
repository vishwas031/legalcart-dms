import { IBaseModel } from "../base";

export interface ICompanyModel extends IBaseModel {
  name: string;
  logo: string;
  about: string | null;
}
