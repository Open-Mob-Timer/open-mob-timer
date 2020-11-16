import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { createConnection, ConnectionOptions } from 'typeorm';
import { User } from './entity/user';
import { Mob } from './entity/mob';
import * as routes from './routes';

const port = process.env.PORT || 3000;

const connection: ConnectionOptions = {
    type: 'mssql',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: 1433,
    username: process.env.TYPEORM_USERNAME || 'sa',
    password: process.env.TYPEORM_PASSWORD || 'root',
    database: process.env.TYPEORM_DATABASE || 'mobtimer',
    entities: [Mob, User]
};

createConnection(connection).then(async connection => {
    const app = express();
    const server = require('http').createServer(app);
    const options = {
        serveClient: false,
        log: false,
        agent: false,
        transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
    };
    const io = require('socket.io')(server, options);

    // app.use(express.static(path.resolve(__dirname, '../dist')));
    app.use(express.static(path.resolve()));
    app.use(bodyParser.json());
    app.use(express.json());


    app.get('/', (req, res) => {
        res.sendFile(__dirname);
    });

    app.use('/api', routes);

    server.listen(port, () => console.log(`app listening at http://localhost:${port}`));

    // io.origins(['*:*']);

    app.set('socketio', io);

    io.on('connection', (socket) => {
        socket.on('join-room', (room) => {
            socket.join(room);
        });
    });


}).catch(error => console.log(error));

