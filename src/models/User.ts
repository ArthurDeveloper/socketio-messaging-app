import prisma from './index';

export default {
    async create(name: string, password: string) {
        const user = await prisma.user.create({
            data: {
                name,
                password,
                messages: {}
            }
        });
        return user;
    },
    async get(name: string, password: string) {
        const user = await prisma.user.findFirst({
            where: {
                name,
                password
            }
        });
        return user;
    },
    async getById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        return user;
    },
    async getByName(name: string) {
        const user = await prisma.user.findFirst({
            where: {
                name
            }
        });
        return user;
    },
    async getAll() {
        const users = await prisma.user.findMany();
        return users;
    },
    async delete(id: number) {
        await prisma.user.delete({
            where: {
                id
            }
        });
    }
}