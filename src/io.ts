import { Server } from 'socket.io';
import server from './server';

const io = new Server(server, {
    cors: {
        origin: 'https://socketio-messaging-app.herokuapp.com/',
        methods: ['GET', 'POST']
    }
});

export default io;