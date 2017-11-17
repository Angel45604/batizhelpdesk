'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupStatusModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('status', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    satus: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}
