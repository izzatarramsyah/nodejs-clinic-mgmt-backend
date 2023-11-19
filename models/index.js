import dbConfig from '../config/dbConfig.js';
import sequelize from 'sequelize';

const seq = new sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});

const db = {};
db.sequelize = sequelize;
db.seq = seq;

db.tutorials = require("./tutorial.model.js")(seq, sequelize);