import { OrderController } from "../controllers/order.controller";
import { Router } from "express";

const router = Router();
const orderController = new OrderController();

router.get("/adicionar", async (req, res) => {
    orderController.store(req, res);
})

export default router