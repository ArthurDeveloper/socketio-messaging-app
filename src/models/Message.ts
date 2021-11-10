import prisma from './index';
import User from './User';

export type MessageType = {
    content: string,
    room: string,
    author: {}
}


export default {
    async create({ content, room, author }: MessageType) {
        await prisma.message.create({
            data: {
                content, 
                room,
                author
            }
        });
    },
    async getAllFromRoom(room: string) {
        const messages = await prisma.message.findMany({
            where: {
                room
            }
        });
        return messages;
    }
}