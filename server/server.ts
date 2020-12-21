import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as ormConfig from './ormconfig';
import { createConnection, ConnectionOptions } from 'typeorm';
import * as routes from './routes';

createConnection(ormConfig).then(async connection => {
    const port = process.env.PORT || 3000;
    const app = express();
    const server = require('http').createServer(app);
    const options = {
        serveClient: false,
        log: false,
        agent: false,
        transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
    };
    const io = require('socket.io')(server, options);

    app.use(express.static(path.resolve()));
    app.use(bodyParser.json());
    app.use(express.json());

    app.get('/', (req, res) => {
        res.sendFile(__dirname);
    });

    app.use('/api', routes);

    server.listen(port, () => console.log(`app listening at http://localhost:${port}`));

    app.set('socketio', io);
    app.set('trust proxy', true);

    io.on('connection', (socket) => {
        socket.on('join-room', (room) => {
            socket.join(room);
        });
    });


}).catch(error => console.log(error));
