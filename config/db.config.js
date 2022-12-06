module.exports = {
  development: {
    username: "root",
    // password: "",
    password: "12345678",
    database: "zentiro",
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5, // maximum number of connection in pool
      min: 0, // minimum number of connection in pool
      acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000, // maximum time, in milliseconds, that a connection can be idle before being released
    },
  },
  stagging: {
    username: "root",
    password: "c52^h+D8ayc6*EpC",
    database: "zentiro",
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: "root",
    password: "c52^h+D8ayc6*EpC",
    database: "zentiro",
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
