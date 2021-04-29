import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import routers from './app/routers';
import middlewares from './app/middlewares';
import './database';

class App {
  constructor() {
    this.server = express();
    this.configs();
    this.middlewares();
    this.routers();
  }

  configs() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(cors());
    this.server.use(
      '/attachments',
      express.static(path.resolve(__dirname, 'tmp', 'uploads'))
    );
    dotenv.config({
      path: process.env.NODE_ENV === 'test' ? './../.env.test' : './../.env',
    });
  }

  middlewares() {
    this.server.use(middlewares);
  }

  routers() {
    this.server.use(routers);
  }
}

export default new App().server;
