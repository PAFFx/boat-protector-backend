import express, { Request, Router } from 'express';

import { listBoatsController, createBoatsController } from '../controllers/boat.controller';

const boatRouter = express.Router();

// Connect to ships API controller
boatRouter.get('/', listBoatsController);
boatRouter.post('/', createBoatsController);

export { boatRouter };
