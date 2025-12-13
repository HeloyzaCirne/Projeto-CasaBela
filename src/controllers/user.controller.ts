import { Request, Response } from 'express';
import { prisma } from '../prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class UserController {
    async store(req: Request, res: Response) {
        const nome = req.body.nome;
        const email = req.body.email;
        const senha = req.body.senha;

        const hashedPassword = await bcrypt.hash(senha, 10);

        await prisma.usuarios.create({
            data: {
                nome,
                email,
                senha: hashedPassword,
                tipo: 'cliente',
            },
        });
        res.render('usuario', { usuario: null });
    }

    async login(req: Request, res: Response) {
        const email = req.body.email;
        const senha = req.body.senha;

        const usuario = await prisma.usuarios.findUnique({
            where: {
                email: email,
            },
        });

        if (!usuario) {
            return res.redirect('/usuario');
        }

        const isValidPassword = await bcrypt.compare(senha, usuario.senha);

        if (isValidPassword) {
            const token = jwt.sign(
                { id: usuario.id_usuario, email: usuario.email },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '1h' }
            );

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 3600000, // 1 hour
            });
        }

        res.redirect('/usuario');
    }

    async show(req: Request, res: Response) {
        if (!req.cookies.token) {
            return res.render('usuario', { usuario: null });
        }
        const token = req.cookies.token;
        const { id } = jwt.decode(token) as { id: number; email: string };
        const usuario = await prisma.usuarios.findUnique({
            where: { id_usuario: Number(id), ativo: true },
        });
        res.render('usuario', { usuario });
    }

    async update(req: Request, res: Response) {
        if (!req.cookies.token) {
            return res.render('usuario', { usuario: null });
        }
        const token = req.cookies.token;
        const { id } = jwt.decode(token) as { id: number; email: string };
        const usuario = await prisma.usuarios.update({
            data: req.body,
            where: { id_usuario: Number(id) },
        });
        res.render('usuario', { usuario });
    }

    async logout(req: Request, res: Response) {
        res.clearCookie('token');
        res.redirect('/usuario');
    }

    async remove(req: Request, res: Response) {
        const token = req.cookies.token;
        const { id } = jwt.decode(token) as { id: number; email: string };
        const usuario = await prisma.usuarios.delete({
            where: { id_usuario: Number(id) },
        });
        res.clearCookie('token').redirect('/');
    }

    async removeSoft(req: Request, res: Response) {
        const token = req.cookies.token;
        const { id } = jwt.decode(token) as { id: number; email: string };
        const usuario = await prisma.usuarios.update({
            data: { ativo: false },
            where: { id_usuario: Number(id) },
        });
        res.clearCookie('token').redirect('/');
    }
}
