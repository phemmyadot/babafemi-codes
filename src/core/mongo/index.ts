import { MongoClient } from "mongodb";

declare const global: {
  _mongoClientPromise: any;
};

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) throw new Error("Please add your Mongo URI to .env file");

let client = new MongoClient(uri, options);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
