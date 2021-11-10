import server from './server';
import './socket/messaging';

const port = process.env.PORT || '3000';

server.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`)
});
