import redis from 'redis';
import Promise from 'bluebird';
import * as consola from 'consola';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? './.env.test' : './.env',
});

Promise.promisifyAll(redis);

class Cache {
  constructor() {
    this.client = redis.createClient(process.env.REDIS_URL, {
      tls: {
        rejectUnauthorized: false,
      },
    });

    this.client.monitor(() => {
      consola.success('Entering monitoring mode.');
    });

    this.client.on('monitor', (time, args) => {
      consola.info(`(monitor redis): ${time}:${args}`);
    });
  }

  get(key) {
    return this.client.getAsync(key);
  }

  set(key, data) {
    return this.client.setAsync(key, data);
  }

  async setExpire(key, data, ttl) {
    const response = await this.set(key, data);
    await this.client.expireAsync(key, ttl);

    return response;
  }

  hincrby(hash, key, data) {
    return this.client.hincrbyAsync(hash, key, data);
  }

  smembers(key) {
    return this.client.smembersAsync(key);
  }

  sadd(key, data) {
    return this.client.saddAsync(key, data);
  }

  srem(key, data) {
    return this.client.sremAsync(key, data);
  }

  delete(key) {
    return this.client.del(key);
  }
}

export default new Cache();
