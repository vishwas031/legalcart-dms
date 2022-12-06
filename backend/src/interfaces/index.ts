import { IUserModel } from "./user";

declare global {
  namespace Express {
    interface User extends IUserModel {}
  }
}
