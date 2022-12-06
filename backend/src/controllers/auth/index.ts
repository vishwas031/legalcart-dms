import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
// import UserModel from "../../database/models/user";
import passport from "passport";

function createToken(user: Express.User) {
  return jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "DEFAULT_JWT_SECRET",
    { expiresIn: "30d" }
  );
}

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).json({ message: info.message });
      return;
    }
    res
      .status(200)
      .json({ token: createToken(user), message: "Login successfully" });
  })(req, res, next);
};
