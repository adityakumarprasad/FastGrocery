import mongoose from "mongoose";

const mongodburl = process.env.MONGODB_URL || '';
if (!mongodburl) {
  throw new Error('Please define the MONGODB_URL environment variable inside .env');
}

let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cache.conn) {
    return cache.conn;
  }
  if (!cache.promise) {
    cache.promise = mongoose.connect(mongodburl).then((conn) => conn.connection);
  }
  try {
    const conn = await cache.promise;
    return conn;
  }
  catch (err) {
    console.log("MongoDB connection error:", err);
    throw err;
  }
}

export default dbConnect;