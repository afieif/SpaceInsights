import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });

export const getCache = (key) => {
  return cache.get(key);
};

export const setCache = (key, value, ttl) => {
  cache.set(key, value, ttl || 300); // Default 5 mins
};

export const delCache = (key) => {
  cache.del(key);
};

export const flushCache = () => {
  cache.flushAll();
};
