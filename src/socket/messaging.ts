import io from '../io';
import Message, { MessageType } from '../models/Message';
import User from '../models/User';

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected!`);

    socket.on('enterInRoom', async (data) => {
        socket.join(data.room_name);
        
        const messages = await Message.getAllFromRoom(data.room_name);
        for (const { content, authorId } of messages) {
            const author = await User.getById(authorId);
            socket.emit('sendMessage', { 
                content,
                from_room: data.room_name,
                author: author?.name
            });
        }
    });

    socket.on('sendMessage', async (data: { content: string, room: string, author: string }) => {
        const user = await User.getByName(data.author);
        const authorId = user?.id;
        await Message.create({
            content: data.content,
            room: data.room,
            author: { 
                connect: {
                    id: authorId
                }
            }
        });
        io.to(data.room).emit('sendMessage', {
            content: data.content,
            room: data.room,
            author: data.author
        });
    });
});