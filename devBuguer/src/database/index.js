import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import configDatabase from '../config/database.js'; // configurações do banco

import User from '../app/models/User.js';
import Product from '../app/models/Products.js';
import Category from '../app/models/category.js';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(configDatabase);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }

  //oque vai conectar no banco mongoDB
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/devburger',
    );
  }
}

export default new Database();
