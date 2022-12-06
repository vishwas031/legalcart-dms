import { AccessRole } from "../interfaces/user";
import Express from "express";

export const accessControl = (allowedRoles: AccessRole | Array<AccessRole>) => {
  return (
    req: Express.Request,
    _: Express.Response,
    next: Express.NextFunction
  ) => {
    if (!req.user) throw new Error("Invalid User");
    else {
      const userAccessRole = req.user.accessRole;
      if (userAccessRole === AccessRole.Admin) return next(); // admin should have access to all permissions for now
      if (Array.isArray(allowedRoles)) {
        if (allowedRoles.includes(userAccessRole)) return next();
      } else {
        if (allowedRoles == userAccessRole) return next();
      }
      throw new Error("User doesn't have enough permissions for this action.");
    }
  };
};
