import { PrismaClient } from '../generated/prisma/client';

export const prisma = new PrismaClient();

async function inserirCategorias() { // Função para inserir as categorias no banco caso não existam
    await prisma.categorias.upsert({
        where: {
            nome: 'decoração',
        },
        update: {},
        create: {
            nome: 'decoração',
        },
    });

    await prisma.categorias.upsert({
        where: {
            nome: 'têxtil',
        },
        update: {},
        create: {
            nome: 'têxtil',
        },
    });
    await prisma.categorias.upsert({
        where: {
            nome: 'iluminação',
        },
        update: {},
        create: {
            nome: 'iluminação',
        },
    });
    await prisma.categorias.upsert({
        where: {
            nome: 'móveis',
        },
        update: {},
        create: {
            nome: 'móveis',
        },
    });
}

inserirCategorias();