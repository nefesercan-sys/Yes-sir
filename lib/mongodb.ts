import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI!;
let clientPromise: Promise<MongoClient>;
declare global { var _mc: Promise<MongoClient> | undefined; }
if (process.env.NODE_ENV === 'development') {
  if (!global._mc) global._mc = new MongoClient(uri).connect();
  clientPromise = global._mc;
} else {
  clientPromise = new MongoClient(uri).connect();
}
export default clientPromise;
export async function getDb() { return (await clientPromise).db('hizmetara'); }
