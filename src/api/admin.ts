import { Stats, CXO, BusinessRequest } from '@/types/admin';
import db from './db.json';

export const getStats = (): Promise<Stats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(db.stats);
    }, 500);
  });
};

export const getCXOs = (): Promise<CXO[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(db.cxos);
    }, 500);
  });
};

export const getBusinessRequests = (): Promise<BusinessRequest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(db.businessRequests);
    }, 500);
  });
};
