import * as express from 'express';
const router = express.Router();

const mobsCtrl = require('../controllers/mobs.controller');
router.get('/mobs/:id', mobsCtrl.getMobById);
router.post('/mobs', mobsCtrl.createMob);

const usersCtrl = require('../controllers/users.controller');
router.get('/users/:id', usersCtrl.getUserById);
router.post('/users', usersCtrl.createUser);
router.put('/users/:id', usersCtrl.updateUser);
router.put('/users/:id/toggle', usersCtrl.toggleTurnEndsAt);

module.exports = router;
