import mongoose from 'mongoose';

import productTranslations from '@/i18n/pl-PL/products.json';
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

  const products = Object.keys(productTranslations.getProductName).map((key) => ({
    name: key,
    category: '',
  }));

  await Product.insertMany(products);
  mongoose.connection.close();
} catch (e) {
  console.log(e);
}
