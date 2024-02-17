import express, { Request, Router } from 'express';

import { listBoatsController } from '../controllers/boat.controller';

const boatRouter = express.Router();

// Connect to ships API controller
boatRouter.get('/', listBoatsController);

export { boatRouter };
