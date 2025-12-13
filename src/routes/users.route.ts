import { UserController } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();
const userController = new UserController();

router.get("/", (req, res) => {
    userController.show(req, res);
})

router.post("/create", (req, res) => {
    userController.store(req, res);
})

router.post("/login", (req, res) => {
    userController.login(req, res);
})

router.post("/update", (req, res) => {
    userController.update(req, res);
})

router.get("/logout", (req, res) => {
    userController.logout(req, res);
})

router.get("/remove", (req, res) => {
    userController.removeSoft(req, res);
})

router.get("/:id", (req, res) => {
    userController.show(req, res);
})

export default router;
