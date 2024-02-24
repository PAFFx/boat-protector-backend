// create response from request with other modules

import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../utils/logging.utils';
import { db } from '../services/mongo.service';

async function listBoatsController(req: Request, res: Response, next: NextFunction) {
  // TODO: Implement search center query string
  try {
    let boats = (await db.boatsColl.find({}).toArray()).map((x) => ({
      boatID: x['_id'].toString(),
      boatName: x['boatName'],
      boatType: x['boatType'],
      status: x['status'],
      location: x['location'],
    }));

    res.status(200).send({ boats: boats });
  } catch (err) {
    const errMsg = getErrorMessage(err);
    next(errMsg);
  }
}

async function createBoatsController(req: Request, res: Response, next: NextFunction) {
  try {
    const doc = {
      status: 'normal',
      location: {
        latitude: null,
        longitude: null,
      },
      boatName: req.body.boatName,
      boatType: req.body.boatType,
    };

    const result = await db.boatsColl.insertOne(doc);
    res.status(201).send({ boatID: result.insertedId.toString() });
  } catch (err) {
    const errMsg = getErrorMessage(err);
    next(errMsg);
  }
}

export { listBoatsController, createBoatsController };
