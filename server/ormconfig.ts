import { User } from './entity/user';
import { Mob } from './entity/mob';
import { ConnectionOptions } from 'typeorm';

const ORMConfig: ConnectionOptions = {
    type: 'mssql',
    host: process.env.TYPEORM_HOST || 'localhost\\SQLEXPRESS',
    port: 1433,
    username: process.env.TYPEORM_USERNAME || 'mtadmin',
    password: process.env.TYPEORM_PASSWORD,
    database: 'mobtimer',
    entities: [Mob, User]
}

export = ORMConfig;
