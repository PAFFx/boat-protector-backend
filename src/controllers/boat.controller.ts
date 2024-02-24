// create response from request with other modules

import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../utils/logging.utils';
import { db } from '../services/mongo.service';
import { ObjectId } from 'mongodb';

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

async function getBoatController(req: Request, res: Response, next: NextFunction) {
  try {
    const filter = {
      _id: new ObjectId(req.params.boatID),
    };
    const boat = await db.boatsColl.findOne(filter);

    if (boat == null) {
      res.status(404).send('Not Found');
      return;
    }
    res.status(200).send({
      boatID: boat._id.toString(),
      boatName: boat.boatName,
      boatType: boat.boatType,
      status: boat.status,
      location: {
        latitude: boat.location.latitude,
        longitude: boat.location.longitude,
      },
    });
  } catch (err) {
    const errMsg = getErrorMessage(err);
    next(errMsg);
  }
}

async function patchBoatPositionController(req: Request, res: Response, next: NextFunction) {
  try {
    const filter = {
      _id: new ObjectId(req.params.boatID),
    };

    const update = {
      $set: {
        location: {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        },
      },
    };

    const result = await db.boatsColl.findOneAndUpdate(filter, update);

    if (result == null) {
      res.status(404).send('Not Found');
      return;
    }
    res.status(200).send('edited');
  } catch (err) {
    const errMsg = getErrorMessage(err);
    next(errMsg);
  }
}

export { listBoatsController, createBoatsController, getBoatController, patchBoatPositionController };
