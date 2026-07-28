// MongoDB connection singleton optimized for serverless (Netlify Functions)
import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    return null;
  }

  // Return cached connection if it's still alive
  if (cached.conn) {
    if (cached.conn.connection.readyState === 1) {
      return cached.conn;
    }
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 5,
        minPoolSize: 1,
        maxIdleTimeMS: 10000,
        serverSelectionTimeoutMS: 2500, // Fast 2.5s selection timeout
        socketTimeoutMS: 20000,
        connectTimeoutMS: 2500,
      })
      .then((mongooseInstance) => {
        console.log('✅ MongoDB connected successfully');
        return mongooseInstance;
      })
      .catch((error) => {
        // Log info quietly without triggering Next.js dev overlay console.error
        console.log('ℹ️ MongoDB connection unavailable (using local seed data):', error.message);
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

export default connectDB;
