// create response from request with other modules

import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../utils/logging.utils';

async function listBoatsController(req: Request, res: Response, next: NextFunction) {
  try {
    res.json({
      ships: 'Implement this',
    });
  } catch (err) {
    const errMsg = getErrorMessage(err);
    next(errMsg);
  }
}

export { listBoatsController };
