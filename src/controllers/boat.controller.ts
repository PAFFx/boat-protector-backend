// create response from request with other modules

import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../utils/logging.utils';
import { db } from '../services/mongo.service';
import { ObjectId } from 'mongodb';

async function listBoatsController(req: Request, res: Response, next: NextFunction) {
  try {
    var filter = {};
    if (req.query['location'] != undefined && req.query['radius'] != undefined) {
      const location = JSON.parse(req.query['location'].toString());
      const radius = parseFloat(req.query['radius'].toString());

      filter = {
        location: {
          $geoWithin: {
            // $centerSphere: [location['longitude'], location['latitude']],
            $centerSphere: [[location['latitude'], location['longitude']], radius],
          },
        },
      };
    }
    let boats = (await db.boatsColl.find(filter).toArray()).map((x) => ({
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
      _id: new ObjectId(req.body.id),
      status: 'normal',
      location: {
        latitude: null,
        longitude: null,
      },
      boatName: null,
      boatType: null,
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

async function postBoatEmergencyController(req: Request, res: Response, next: NextFunction) {
  try {
    // check if id is valid
    const filter = {
      _id: new ObjectId(req.params.boatID),
    };
    const findBoatResult = await db.boatsColl.findOne(filter);
    if (findBoatResult == null) {
      res.status(404).send('not found');
      return;
    }
    if (findBoatResult.status != 'normal') {
      res.status(400).send('Boat is currently in emergency state');
    }

    // create emergency
    const doc = {
      boatID: new ObjectId(req.params.boatID),
      timestamp: req.body.timestamp,
      position: {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },
      status: req.body.status,
      active: true,
    };
    const insertEmergencyResult = await db.emergenciesColl.insertOne(doc);

    // update boat
    const update = {
      $set: {
        position: {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        },
        status: req.body.status,
      },
    };
    const updateBoatResult = await db.boatsColl.findOneAndUpdate(filter, update);

    res.status(200).send({
      emergencyID: insertEmergencyResult.insertedId,
    });
  } catch (err) {
    const errMsg = getErrorMessage(err);
    next(errMsg);
  }
}

async function patchCancelBoatEmergencyController(req: Request, res: Response, next: NextFunction) {
  try {
    // check if id is valid
    const filter = {
      _id: new ObjectId(req.params.boatID),
    };
    const findBoatResult = await db.boatsColl.findOne(filter);
    if (findBoatResult == null) {
      res.status(404).send('not found');
      return;
    }
    if (findBoatResult.status == 'normal') {
      res.status(500).send('Boat is not in any emergency state');
      return;
    }

    // update emergency
    const updateFilter = {
      boatID: new ObjectId(req.params.boatID),
      active: true,
    };
    const updateBody = {
      $set: {
        active: false,
      },
    };
    const updateEmergencyResult = await db.emergenciesColl.updateMany(updateFilter, updateBody);

    // update boat
    const boatUpdateBody = {
      $set: {
        status: 'normal',
      },
    };
    const updateBoatResult = await db.boatsColl.findOneAndUpdate(filter, boatUpdateBody);

    res.status(200).send('Boat emergency cancelled');
  } catch (err) {
    const errMsg = getErrorMessage(err);
    next(errMsg);
  }
}

export {
  listBoatsController,
  createBoatsController,
  getBoatController,
  patchBoatPositionController,
  postBoatEmergencyController,
  patchCancelBoatEmergencyController,
};
