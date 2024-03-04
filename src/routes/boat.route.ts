import express, { Request, Router } from 'express';

import {
  listBoatsController,
  createBoatsController,
  getBoatController,
  patchBoatPositionController,
  postBoatEmergencyController,
  patchCancelBoatEmergencyController,
  patchBoatController,
} from '../controllers/boat.controller';

const boatRouter = express.Router();

// Connect to boats API controller
boatRouter.get('/', listBoatsController);
boatRouter.post('/', createBoatsController);
boatRouter.get('/:boatID', getBoatController);
boatRouter.patch('/:boatID', patchBoatController);

// position
boatRouter.patch('/:boatID/position', patchBoatPositionController);

// emergency
boatRouter.post('/:boatID/emergency', postBoatEmergencyController);
boatRouter.patch('/:boatID/emergency/cancel', patchCancelBoatEmergencyController);

export { boatRouter };
