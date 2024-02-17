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

export { listBoatsController };
