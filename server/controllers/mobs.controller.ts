import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Mob } from '../entity/mob';

module.exports.getMobById = async (req: Request, res: Response) => {
    try {
        const mob = await getRepository(Mob).findOne(req.params.id, { relations: ['users'] });

        if (!mob) {
            res.status(404).send();
        }

        return res.send(mob);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.createMob = async (req: Request, res: Response) => {
    try {
        const mob = await getRepository(Mob).create(req.body);
        const result = await getRepository(Mob).save(mob);

        return res.send(result);
    } catch (error) {
        res.status(500).send('Error hit: ', error);
    }
};
