import { Server } from 'socket.io';
import server from './server';

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

export default io;