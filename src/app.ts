import express, { Express } from 'express';

import { boatRouter } from './routes/boat.route';

const app: Express = express();

// add router to app
app.use('/ships', boatRouter);

const port: number = 3000;
app.listen(port, () => console.log(`Application is running on port ${port}`));
