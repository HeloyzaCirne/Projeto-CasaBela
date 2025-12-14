import { Request, Response } from 'express';
import { prisma } from '../prisma';
import jwt from 'jsonwebtoken';

export class ProductController {
    async store(req: Request, res: Response) {
        const { nome, descricao, estoque, categoria, preco, imagem } = req.body;

        await prisma.produtos.create({
            data: {
                nome,
                descricao,
                estoque: Number(estoque),
                id_categoria: categoria,
                preco: Number(preco),
                imagem: imagem
            }
        });

        const produtos = await prisma.produtos.findMany({
            include: {
                categoria: true,
            },
        });
        res.redirect('/usuario/adm');
    }

    async update(req: Request, res: Response) {
        const productId = req.params.id;
        const { nome, descricao, estoque, categoria, preco } = req.body;

        const produto = await prisma.produtos.update({
            data: {
                nome,
                descricao,
                estoque: Number(estoque),
                id_categoria: categoria,
                preco: Number(preco),
            },
            where: {
                id_produto: Number(productId),
            },
        });

        res.redirect('/usuario/adm');
    }

    async remove(req: Request, res: Response) {
        const productId = req.params.id;

        await prisma.produtos.update({
            where: {
                id_produto: Number(productId),
            },
            data: {
                ativo: false
            }
        });

        res.redirect('/usuario/adm');
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
    
    async showCart(req: Request, res: Response) {
        if (!req.cookies.token) {
            return res.redirect('/usuario');
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

        res.render("carrinho", { produtos: products });
    }

    async addToCart(req: Request, res: Response) {
        if (!req.cookies.token) {
            return res.redirect('/usuario');
        }
        const token = req.cookies.token;
        const userId = (jwt.decode(token) as { id: number; email: string }).id;
        const productId = req.params.id;
        const cartProduct = await prisma.carrinho.findFirst({
            where: {
                id_usuario: userId,
                id_produto: Number(productId),
            }
        });

        const product = await prisma.produtos.findUnique({
            where: {
                id_produto: Number(productId),
            }
        });

        if (!cartProduct) {
            await prisma.carrinho.create({
                data: {
                    id_usuario: userId,
                    id_produto: Number(productId),
                    quantidade: 1,
                }
            });
            return res.redirect('/produtos/carrinho');
        }
        if (cartProduct.quantidade >= product!.estoque) {
            return res.redirect('/produtos/carrinho');
        }
        await prisma.carrinho.update({
            data: {
                quantidade: cartProduct.quantidade + 1,
            },
            where: {
                id_carrinho: cartProduct.id_carrinho,
            }
        });
        res.redirect('/produtos/carrinho');
    }

    async removeFromCart(req: Request, res: Response) {
        if (!req.cookies.token) {
            return res.redirect('/usuario');
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
            return res.redirect('/usuario');
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
