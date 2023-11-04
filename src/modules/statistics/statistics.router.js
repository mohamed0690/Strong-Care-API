import express from 'express';
import { statisticsUsers } from './statistics.controller.js';
import { authentication } from '../../../middleware/authentication.js';
import { authorization } from '../../../middleware/authorization.js';
import { Role } from '../../../enums/role.js';

const statisticsRouter = express.Router();


statisticsRouter.route('/').get(authentication, authorization(Role.ADMIN, Role.COMPENSATION_DEPART, Role.REQUESTS_DEPART), statisticsUsers);

export default statisticsRouter;
