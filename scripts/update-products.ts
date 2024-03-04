import mongoose from 'mongoose';

import { Product } from '@products/models/product';
import { getEnvSecure } from '@utils/getEnvSecure';

try {
  await mongoose.connect(getEnvSecure('DB_URL'), {
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    },
  });

  await Product.updateMany({}, { $set: { 'name.en-US': '' } });

  mongoose.connection.close();
} catch (e) {
  console.log(e);
}