import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';
const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
 let cached = global.mongo

 if (!cached) {
   cached = global.mongo = { conn: null, promise: null }
 }

 //'mongodb://admin:admin@localhost:27017/?authSource=admin&readPreference=primary&ssl=false'
const client = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//'DoubtCounter'
async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(MONGODB_DB);
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;