'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')
const bcrypt = require('bcrypt')
const debug = require('debug')('batizdeskhelp:api:storage')


module.exports = function setupNNModel (config, mod1, mod2) {
  const sequelize = setupDatabase(config)
  const NNModel = sequelize.define(mod1.tableName + mod2.tableName)
  mod1.belongsToMany(mod2, {through: NNModel})
  mod2.belongsToMany(mod1, {through: NNModel})
  //No retorna nada, sólo crea la tabla de relación en la base
}