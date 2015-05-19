'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.PROJECT_DATABASE, process.env.PROJECT_DATABASE_USER, process.env.PROJECT_DATABASE_PASSWORD);

// doc: http://docs.sequelizejs.com/en/latest/docs/models-definition/

var <%= classedName %> = sequelize.define('User'. {
  name: {
	type: Sequelize.STRING,
	validate: {
		notNull:true
	}
  },
  info: {
	type: Sequelize.STRING,
	validate: {
		notNull:true
	}
  },
  state: {
  	type: Sequelize.ENUM,
	values: ['CREATED', 'CONFIRMED', 'ACTIVE', 'BANNED', 'DELETED']
  }
});

