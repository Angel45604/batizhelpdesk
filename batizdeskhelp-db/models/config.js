'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupConfigModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('config', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    config: {
      type: Sequelize.STRING,
      allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    }
  })
}
