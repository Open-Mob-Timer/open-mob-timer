import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/user';
import { Mob } from '../entity/mob';
import { UserCreateRequest } from '../dto/user/user-create';
import { UserResponse } from '../dto/user/user-response';


module.exports.getUserById = async (req: Request, res: Response) => {
    try {
        const user = await getRepository(User).findOne(req.params.id);

        if (!user) {
            res.status(404).send();
        }

        return res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports.createUser = async (req: Request, res: Response) => {
    try {
        const mob = await getRepository(Mob).findOne(req.body.mobId, { relations: ['users'] });

        if (!mob) {
            res.status(404).send();
        }

        if (mob.users.length > 11) {
            return res.status(400).send('Mob is full');
        }

        const user: UserCreateRequest = {
            name: req.body.name,
            isAway: false,
            mobId: req.body.mobId,
        };

        const data = await getRepository(User).create(user);
        const result = await getRepository(User).save(data);

        const response: UserResponse = {
            id: result.id,
            mobId: result.mobId,
            name: result.name,
            isAway: result.isAway,
            turnEndsAt: result.turnEndsAt
        };

        const io = req.app.get('socketio');
        io.sockets.in(result.mobId).emit('user-added', response);

        return res.send(response);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

module.exports.updateUser = async (req: Request, res: Response) => {
    try {
        const user = await getRepository(User).findOne(req.params.id);

        if (req.body.isAway) {
            req.body.turnEndsAt = null;
        }

        getRepository(User).merge(user, req.body);

        const result = await getRepository(User).save(user);
        const response: UserResponse = {
            id: result.id,
            mobId: result.mobId,
            name: result.name,
            isAway: result.isAway,
            turnEndsAt: result.turnEndsAt
        };

        const io = req.app.get('socketio');
        io.sockets.in(result.mobId).emit('user-updated', response);

        return res.send(response);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports.toggleTurnEndsAt = async (req: Request, res: Response) => {
    try {
        // TODO - Pass turnEndsAt to prevent database call
        const user = await getRepository(User).findOne(req.params.id);

        const currentDate = new Date();
        const fifteenMinutes = new Date(currentDate.getTime() + 15 * 60000);
        const turnEndsAt = user.turnEndsAt || req.query.isOutOfTime ? null : fifteenMinutes;

        getRepository(User).merge(user, { turnEndsAt });

        const result = await getRepository(User).save(user);
        const response: UserResponse = {
            id: result.id,
            mobId: result.mobId,
            name: result.name,
            isAway: result.isAway,
            turnEndsAt: result.turnEndsAt
        };

        const io = req.app.get('socketio');
        io.sockets.in(result.mobId).emit('user-updated', response);

        return res.send(response);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports.deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await getRepository(User).delete(req.params.id);

        const io = req.app.get('socketio');
        io.sockets.in(req.body.mobId).emit('user-deleted', { id: req.params.id });

        return res.send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
