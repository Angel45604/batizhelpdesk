'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupAreaModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('area', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    area: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}
