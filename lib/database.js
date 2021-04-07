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

global.mongo = global.mongo || {};
global.connectionCount = 0;


export async function database(req, res, next) {
  if (!global.mongo.client) {
      global.connectionCount+=1;
      let client = new MongoClient(process.env.MONGODB_URI, {
        poolSize: 10,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    await client.connect();
    if (!global.mongo.client) {
      global.mongo.client = client;
    }
    else{
      global.connectionCount-=1;
      client.close();
    }
  }
  console.log("Connection Count", global.connectionCount);
  req.setTimeout(120000);
  req.dbClient = global.mongo.client;
  req.db = global.mongo.client.db(process.env.MONGODB_DB);
  return next();
}

export async function connection() {
  if (!global.mongo.client) {
      global.connectionCount+=1;
      let client = new MongoClient(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      await client.connect();
      if (!global.mongo.client) {
        global.mongo.client = client;
      }
      else{
        global.connectionCount-=1;
        client.close();
      }
    }
  console.log("Connection Count", global.connectionCount);
  let conn = {dbClient:global.mongo.client, db:global.mongo.client.db(process.env.MONGODB_DB)};
  return conn;
}


const middleware = nextConnect();

middleware.use(database);

export default middleware;