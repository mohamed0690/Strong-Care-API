import express from 'express';
import { statisticsUsers } from './statistics.controller.js';

const statisticsRouter = express.Router();


statisticsRouter.route('/').get(statisticsUsers);

export default statisticsRouter;
