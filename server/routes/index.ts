import * as express from 'express';
import { rateLimiter, mobCreateRateLimiter } from '../middlewares/ratelimiter';
const router = express.Router();

const mobsCtrl = require('../controllers/mobs.controller');
router.get('/mobs/:id', rateLimiter, mobsCtrl.getMobById);
router.post('/mobs', mobCreateRateLimiter, mobsCtrl.createMob);

const usersCtrl = require('../controllers/users.controller');
router.get('/users/:id', rateLimiter, usersCtrl.getUserById);
router.post('/users', rateLimiter, usersCtrl.createUser);
router.put('/users/:id', rateLimiter, usersCtrl.updateUser);
router.delete('/users/:id', rateLimiter, usersCtrl.deleteUser);
router.put('/users/:id/toggle', rateLimiter, usersCtrl.toggleTurnEndsAt);
router.put('/users/:id/expireturn', rateLimiter, usersCtrl.expireTurn);

module.exports = router;
