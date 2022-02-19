import { Router } from "express";
import UserController from "../../controller/User/UserController";
import checkAccessToken from "../../middlewares/checkAccessToken";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";

const router = Router();

// Get all users
router.get("/", checkAccessToken, UserController.getAll);

// Get one user
router.get("/:id([0-9]+)", UserController.getOneById);

// Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.createUser);

// Edit one user
router.put("/:id([0-9]+)", UserController.editUser);

// Delete one user
router.delete("/:id([0-9]+)", UserController.deleteUser);

export default router;