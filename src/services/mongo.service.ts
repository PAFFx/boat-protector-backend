import * as mongo from 'mongodb';
import config from '../configs/config';
import dbConfig from '../configs/db.config';

class DB extends mongo.Db {
  constructor(client: mongo.MongoClient) {
    super(client, dbConfig.dbName);
    this.boatsColl = this.collection(dbConfig.boatsColl);
    this.emergenciesColl = this.collection(dbConfig.emergenciesColl);
  }
  boatsColl: mongo.Collection;
  emergenciesColl: mongo.Collection;
}

const connectionString = config.STATUS == 'production' ? config.PROD_DB_URL : config.TEST_DB_URL;
const client: mongo.MongoClient = new mongo.MongoClient(connectionString);

export let db: DB;

export async function connectToDatabase() {
  await client.connect();
  db = new DB(client);
}

export async function disconnectFromDatabase() {
  await client.close();
  console.log('\nDatabase connection closed');
}
