import { connect } from 'mongoose';
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL);
export const db = async () => {
  try {
    if (!MONGO_URL) {
      throw Error('failed to fetch MONGO_URL from .env');
    }
    await connect(MONGO_URL);
    console.log('🟢 db connected');
  } catch (error) {
    console.error(error);
  }
};
