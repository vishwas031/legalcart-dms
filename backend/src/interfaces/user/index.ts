import { BaseRequest, ICompanyScopedMdoel } from "../base";

export enum AccessRole {
  Admin = "admin",
  Lawyer = "lawyer",
}
export interface IUserModel extends ICompanyScopedMdoel {
  email: string;
  accessRole: AccessRole;
  name: { first: string; last: string | null };
}

export interface IUserCreateRequest
  extends BaseRequest<{
    name: { first: string; last: string | null };
    email: string;
    accessRole: AccessRole;
  }> {}
