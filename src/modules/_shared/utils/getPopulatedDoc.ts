import { Types } from 'mongoose';

import { type Populated } from '../types';

export function getPopulatedDoc<T>(document: Populated<T>): T | undefined {
  if (!document || document instanceof Types.ObjectId) return;

  return document;
}
