import { Request, Response } from 'express';
import { prisma } from '../prisma';
import jwt from 'jsonwebtoken';

export class ProductController {
    async store(req: Request, res: Response) {
        
    }

    async showAll(req: Request, res: Response) {
        const products = await prisma.produtos.findMany({
            include: {
                categoria: true,
            },
        });
        res.render("catalogo", { produtos: products });
    }

    async show(req: Request, res: Response) {
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
    }
    
    async update(req: Request, res: Response) {
    }
    
    async showCart(req: Request, res: Response) {
        if (!req.cookies.token) {
            return res.render('usuario', { usuario: null });
        }
        const token = req.cookies.token;
        const userId = (jwt.decode(token) as { id: number; email: string }).id;
        const products = await prisma.carrinho.findMany({
                where: {
                    id_usuario: Number(userId),
                },
                include: {
                    produto: true,
                    usuario: true,
                },
            });

        console.log(products);
        res.render("carrinho", { produtos: products });
    }

    async addToCart(req: Request, res: Response) {
        if (!req.cookies.token) {
            return res.render('usuario', { usuario: null });
        }
        const token = req.cookies.token;
        const userId = (jwt.decode(token) as { id: number; email: string }).id;
        const productId = req.params.id;
        const product = await prisma.carrinho.findFirst({
            where: {
                id_usuario: userId,
                id_produto: Number(productId),
            }
        });
        if (!product) {
            await prisma.carrinho.create({
                data: {
                    id_usuario: userId,
                    id_produto: Number(productId),
                    quantidade: 1,
                }
            });
            return res.redirect('/produtos/carrinho');
        }
        await prisma.carrinho.update({
            data: {
                quantidade: product.quantidade + 1,
            },
            where: {
                id_carrinho: product.id_carrinho,
            }
        });
        res.redirect('/produtos/carrinho');
    }

    async removeFromCart(req: Request, res: Response) {
        if (!req.cookies.token) {
            return res.render('usuario', { usuario: null });
        }
        const productCartId = req.params.id;
        const product = await prisma.carrinho.delete({
            where: {
                id_carrinho: Number(productCartId),
            }
        });
        res.redirect('/produtos/carrinho');
    }

    async removeOneFromCart(req: Request, res: Response) {
        if (!req.cookies.token) {
            return res.render('usuario', { usuario: null });
        }
        const productCartId = req.params.id;
        const product = await prisma.carrinho.update({
            data: {
                quantidade: {
                    decrement: 1,
                }
            },
            where: {
                id_carrinho: Number(productCartId),
            }
        });

        if (product.quantidade <= 0) {
            await prisma.carrinho.delete({
                where: {
                    id_carrinho: Number(productCartId),
                }
            });
        }

        res.redirect('/produtos/carrinho');
    }
    // async remove(req: Request, res: Response) {
    //     const id = req.params.id;
    //     const usuario = await prisma.user.delete({ where: { id } });
    //     res.redirect('/');
    // }

    // async removeSoft(req: Request, res: Response) {
    //     const id = req.params.id;
    //     const usuario = await prisma.user.update({
    //         data: { deleted: true },
    //         where: { id },
    //     });
    //     res.redirect('/');
    // }
}
