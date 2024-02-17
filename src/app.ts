import express, { Express } from 'express';

import { boatRouter } from './routes/boat.route';
import config from './configs/config';
import { connectToDatabase } from './services/mongo.service';

const app: Express = express();

console.log(`launch in ${config.STATUS} mode`);
const port: number = config.STATUS == 'production' ? config.PROD_PORT! : config.TEST_PORT;

connectToDatabase()
  .then(() => {
    // add router
    app.use('/boats', boatRouter);
    // run server
    app.listen(port, () => console.log(`Application is running on port ${port}\n`));
  })
  .catch((e: Error) => {
    console.error('Database connection failed', e);
    process.exit();
  });
