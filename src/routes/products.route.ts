import { prisma } from "../prisma";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    const products = await prisma.produtos.findMany({
        include: {
            categoria: true,
        },
    });
    res.render("catalogo", { produtos: products });
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await prisma.produtos.findUnique({
        where: {
            id_produto: Number(id),
        },
        include: {
            categoria: true,
        },
    });
    res.render("produto", { produto: product });
})

export default router;
