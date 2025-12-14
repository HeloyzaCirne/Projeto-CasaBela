import { Request, Response } from 'express';
import { prisma } from '../prisma';
import jwt from 'jsonwebtoken';

export class OrderController {
    async store(req: Request, res: Response) {
        if (!req.cookies.token) {
            return res.redirect('/usuario');
        }
        const token = req.cookies.token;
        const userId = (jwt.decode(token) as { id: number; email: string }).id;

        const products = await prisma.carrinho.findMany({
            where: {
                id_usuario: userId,
            },
            include: {
                produto: true,
                usuario: true,
            },
        });

        const itens = products.map((item) => ({
            id_produto: item.id_produto,
            quantidade: item.quantidade,
        }));
        const valor_total = products.reduce(
            (total, item) => total + item.produto.preco * item.quantidade,
            0
        );

        await prisma.pedidos.create({
            data: {
                id_usuario: userId,
                valor_total: valor_total,
                status: 'Preparando',
                itens: {
                    createMany: {
                        data: itens,
                    },
                },
            },
        });

        await prisma.carrinho.deleteMany({
            where: {
                id_usuario: userId,
            },
        });

        res.redirect('/usuario');
    }
}
