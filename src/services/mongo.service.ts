import * as mongo from 'mongodb';
import config from '../configs/config';
import dbConfig from '../configs/db.config';

const connectionString = config.STATUS == 'production' ? config.PROD_DB_URL : config.TEST_DB_URL;

class DB extends mongo.Db {
  constructor(client: mongo.MongoClient) {
    super(client, dbConfig.dbName);
    this.boatsColl = this.collection(dbConfig.boatsColl);
    this.emergenciesColl = this.collection(dbConfig.emergenciesColl);
  }
  boatsColl: mongo.Collection;
  emergenciesColl: mongo.Collection;
}

export let db: DB;

export async function connectToDatabase() {
  const client: mongo.MongoClient = new mongo.MongoClient(connectionString);
  await client.connect();

  db = new DB(client);
}
