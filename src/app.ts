import express, { Express } from 'express';

import { boatRouter } from './routes/boat.route';
import config from './configs/config';
import { connectToDatabase, disconnectFromDatabase } from './services/mongo.service';
var cors = require('cors');

const app: Express = express();

console.log(`launch in ${config.STATUS} mode`);
const port: number = config.STATUS == 'production' ? config.PROD_PORT! : config.TEST_PORT;

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
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

// TODO: Cannot be used with nodemon cause only app exited but not nodemon (Will create used port problem)
// process.on('SIGTERM', disconnectFromDatabase);
// process.on('SIGINT', disconnectFromDatabase);
// process.on('exit', disconnectFromDatabase);
