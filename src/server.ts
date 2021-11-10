import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes';
import ejs from 'ejs';
import { createServer } from 'http';

const app = express();

app.use('/', express.static('public'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist/css'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.engine('ejs', ejs.renderFile);

app.use(cookieParser());
app.use(routes);

const server = createServer(app);

export default server;
