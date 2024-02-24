import express, { Request, Router } from 'express';

import {
  listBoatsController,
  createBoatsController,
  getBoatController,
  patchBoatPositionController,
} from '../controllers/boat.controller';

const boatRouter = express.Router();

// Connect to boats API controller
boatRouter.get('/', listBoatsController);
boatRouter.post('/', createBoatsController);
boatRouter.get('/:boatID', getBoatController);

// position
boatRouter.patch('/:boatID/position', patchBoatPositionController);

export { boatRouter };
