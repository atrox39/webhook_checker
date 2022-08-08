import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL);
const { connection } = mongoose;

export default connection;
