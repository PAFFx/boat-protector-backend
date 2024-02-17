interface dbConfig {
  dbName: string;
  boatsColl: string;
  emergenciesColl: string;
}

const dbConfig = {
  dbName: 'boatProtector',
  boatsColl: 'boats',
  emergenciesColl: 'emergencies',
};

export default dbConfig;
