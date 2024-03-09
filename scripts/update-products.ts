import mongoose from 'mongoose';

import { mongoUri } from '@vars';

try {
  await mongoose.connect(mongoUri, {
    serverApi: {
      version: '1',
      strict: true,
      deprecationErrors: true,
    },
  });

  mongoose.connection.close();
} catch (e) {
  console.log(e);
}