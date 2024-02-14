import express, { Request, Router } from 'express';

import { listShipsController } from '../controllers/ship.controller';

const boatRouter = express.Router();

// Connect to ships API controller
boatRouter.get('/', listShipsController);

export { boatRouter };
