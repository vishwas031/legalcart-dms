import CompanyModel from "../database/models/company";
import UserModel from "../database/models/user";
import { ICompanyAndUserCreateRequest } from "../interfaces/admin";
import AuthModel from "../database/models/auth";
import generateUuid from "../database/common";
import { AccessRole, IUserModel } from "../interfaces/user";
import Crypto from "crypto";
import { sendWelcomeEmail } from "./emailService";
export const createCompanyAndUser = async (
  req: ICompanyAndUserCreateRequest
) => {
  const json = req.body;
  const company = await new CompanyModel({
    _id: generateUuid(),
    name: json.companyName,
    logo: json.logo,
    about: json.about,
    created: Date(),
    updated: Date(),
    deleted: false,
  }).save();

  const user = await new UserModel({
    _id: generateUuid(),
    email: json.email,
    created: Date(),
    updated: Date(),
    deleted: false,
    companyId: company._id,
    accessRole: AccessRole.Admin,
    name: { first: json.name.first, last: json.name.last },
  }).save();

  await generateAuthForUser(user, json.password);

  return { company };
};

export const generateAuthForUser = async (
  user: IUserModel,
  password?: string,
  sendEmail?: boolean
) => {
  if (!password) password = getRandomPassword();
  try {
    await new AuthModel({
      _id: generateUuid(),
      userId: user._id,
      created: Date(),
      updated: Date(),
      deleted: false,
      password: password,
    }).save();
    if (sendEmail) sendWelcomeEmail(user.email, password);
  } catch (err) {
    console.error(err);
  }
};

const getRandomPassword = () => {
  const dev = process.env.NODE_ENV !== "production";
  if (dev) return "Test@1234"; //unsafe
  return Crypto.randomBytes(12).toString("base64").slice(0, 12);
};
