import { BaseRequest } from "../base";

export interface ICompanyAndUserCreateRequest
  extends BaseRequest<{
    companyName: string;
    logo: string;
    about: string;
    email: string;
    password: string;
    name: { first: string; last?: string | null };
  }> {}
