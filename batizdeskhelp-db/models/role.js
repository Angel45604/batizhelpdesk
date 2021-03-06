'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupRoleModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('role', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isEditor: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  })
}
