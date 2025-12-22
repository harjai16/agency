import { MongoClient } from 'mongodb';

// MongoDB connection - encode password properly
// Password: agency#321 -> agency%23321 (where # = %23)
const username = 'agency';
const password = encodeURIComponent('agency#321'); // Properly encode the password
const cluster = 'agency.puhpslg.mongodb.net';
const database = 'agency';

// Build connection string
const MONGODB_URI = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;
const MONGODB_DB = database;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    try {
      // Verify connection is still alive
      await cachedClient.db("admin").command({ ping: 1 });
      return { client: cachedClient, db: cachedDb };
    } catch (error) {
      // Connection lost, reset cache
      cachedClient = null;
      cachedDb = null;
    }
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    
    // Test the connection
    await client.db("admin").command({ ping: 1 });
    
    const db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Connection string (without password):', `mongodb+srv://${username}:***@${cluster}/${database}`);
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
}

