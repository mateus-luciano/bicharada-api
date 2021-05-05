import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import routers from './app/routers';
import middlewares from './app/middlewares';
import './database';

class App {
  constructor() {
    this.server = express();
    this.config();
    this.middlewares();
    this.routers();
    this.errorHandler();
  }

  config() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(cors());
    this.server.use(morgan('dev'));
    this.server.use(
      '/attachments',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
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

  errorHandler() {
    this.server.use((error, req, res, next) =>
      res.status(error.status).json({
        message: error.message,
      })
    );
  }
}

export default new App().server;
