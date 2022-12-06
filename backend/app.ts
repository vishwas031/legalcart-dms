import express from "express";
import cookieParser from "cookie-parser";
import "./src/services/passport";

// Routes files
import Routes from "./src/routes";
// import generateUuid from "./src/database/common";
// import CompanyModel from "./src/database/models/company";
// import UserModel from "./src/database/models/user";
// import AuthModel from "./src/database/models/auth";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/v1/", Routes);

// const c = new CompanyModel({
//   _id: generateUuid(),
//   name: "kartikay",
//   logo: "testlogo.com",
//   updated: new Date(),
//   created: new Date(),
//   deleted: false,
//   companyId: generateUuid(),
// });
// c.save()
//   .then((data) => {
//     new UserModel({
//       _id: generateUuid(),
//       email: "kbhutani0001@gmail.com",
//       updated: new Date(),
//       created: new Date(),
//       deleted: false,
//       companyId: data._id,
//     })
//       .save()
//       .then(
//         async (u) =>
//           await new AuthModel({
//             _id: generateUuid(),
//             userId: u._id,
//             updated: new Date(),
//             created: new Date(),
//             deleted: false,
//             companyId: c._id,
//             password: "Test@1234",
//           }).save()
//       )
//       .catch((er) => console.log(er));
//   })
//   .catch((er) => console.log(er));

export default app;
