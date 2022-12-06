import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserModel from "../database/models/user";
import AuthModel from "../database/models/auth";

// Setting local strategy:
const localOptions = { usernameField: "email", passwordField: "password" };
const localLogin = new LocalStrategy(
  localOptions,
  async (email: string, password: string, done) => {
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user)
        return done(null, false, { message: "Invalid email or password." });
      const authDetails = await AuthModel.findOne({ userId: user._id });
      if (!authDetails || !user) {
        return done(null, false, { message: "Invalid email or password." });
      }
      const isMatch: boolean = await authDetails.matchPassword(password);
      if (!isMatch) {
        return done(null, false, { message: "Invalid email or password." });
      }
      return done(null, user);
    } catch (e) {
      return done(null, false, {
        message: "Local login strategy: error in server",
      });
    }
  }
);

// Setting the jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const [user, authDetails] = await Promise.all([
      UserModel.findOne({ _id: payload.userId }),
      AuthModel.findOne({ userId: payload.userId }),
    ]);
    if (user && authDetails) {
      done(null, user);
    } else {
      done(null, false, { message: "Invalid token" });
    }
  } catch (e) {
    done(null, false, { message: "Jwt login strategy: error in server" });
  }
});

passport.use(localLogin);
passport.use(jwtLogin);
