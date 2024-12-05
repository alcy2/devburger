import express from 'express';
import router from './route.js';
import Path from 'node:path';

import './database/index.js';

import cors from 'cors'

class App {
  constructor() {
    this.app = express();

    this.app.use(cors())

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use('/product-files', express.static(Path.resolve('uploads')));
    this.app.use('/category-files', express.static(Path.resolve('uploads')));
  }

  routes() {
    this.app.use(router);
  }
}

export default new App().app;
