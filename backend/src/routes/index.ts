import { Router } from "express";
import { AccessRole } from "../interfaces/user";
import { userController } from "../controllers";
import { companyController } from "../controllers";
import { authController } from "../controllers";
import { adminController } from "../controllers";
import { accessControl } from "../middlewares/accessControl";
import { requireAuth } from "../middlewares/authentication";

const router = Router();

//admin routes
router.post("/admin/register", adminController.createCompanyAndUser);

// auth related routes
router.post("/auth/login", authController.login);

// user related routes
router.get("/user", requireAuth, userController.getUserFromToken);
router.post(
  "/user",
  requireAuth,
  accessControl(AccessRole.Admin),
  userController.createUser
);

// company related routes
router.get("/company", requireAuth, companyController.getSelfCompany);

export default router;
