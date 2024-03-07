import mongoose from 'mongoose';

import { Product } from '@products/models/product';
import { mongoUri } from '@vars';

try {
  await mongoose.connect(mongoUri, {
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    },
  });

  await Product.updateMany({}, { $set: { category: null } });

  mongoose.connection.close();
} catch (e) {
  console.log(e);
}