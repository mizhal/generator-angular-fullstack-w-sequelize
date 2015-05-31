'use strict';

var Sequelize = require('sequelize');
var sequelize = require("../../components/sequelize_singleton");

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

