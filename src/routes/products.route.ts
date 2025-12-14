import { ProductController } from "../controllers/product.controller";
import { prisma } from "../prisma";
import { Router } from "express";

const router = Router();
const productController = new ProductController();

router.get("/", async (req, res) => {
    productController.showAll(req, res);
});

router.post("/cadastrar", async (req, res) => {
    productController.store(req, res);
})

router.get("/carrinho", async (req, res) => {
    productController.showCart(req, res);
})

router.get("/carrinho/adicionar/:id", async (req, res) => {
    productController.addToCart(req, res);
})


router.get("/carrinho/remover/:id", async (req, res) => {
    productController.removeFromCart(req, res);
})

router.get("/carrinho/diminuir/:id", async (req, res) => {
    productController.removeOneFromCart(req, res);
})

router.post("/atualizar/:id", async (req, res) => {
    productController.update(req, res);
})

router.get("/remover/:id", async (req, res) => {
    productController.remove(req, res);
})

router.get("/:id", async (req, res) => {
    productController.show(req, res);
})


export default router;
