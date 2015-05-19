'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/<%= _.slugify(appname) %>-dev'
  },
  sequelize {
  	user: "test",
  	password: "test",
  	host: "127.0.0.1",
  	dbname: "test-db"
  },
  seedDB: true
};
