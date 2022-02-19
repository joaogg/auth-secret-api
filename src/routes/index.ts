import { Router } from "express";
import auth from "./Auth/auth";
import user from "./User/user";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);

export default routes;