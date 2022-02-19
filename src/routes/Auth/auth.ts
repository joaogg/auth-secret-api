import { Router } from "express";
import AuthController from "../../controller/Auth/AuthController";
import { checkJwt } from "../../middlewares/checkJwt";

const router = Router();

//Login route
router.post("/login", AuthController.login);

//Change my password
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;