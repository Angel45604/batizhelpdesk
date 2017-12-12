'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')
const bcrypt = require('bcrypt')
const debug = require('debug')('batizdeskhelp:api:storage')


module.exports = function setupUserModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
      
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(user.password, salt)
      },
      beforeUpdate: (user) => {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(user.password, salt)
      },
      beforeBulkUpdate: (user) => {
        const salt = bcrypt.genSaltSync()
        user.attributes.password = bcrypt.hashSync(user.attributes.password, salt)
      }
    },
    instanceMethods: {
      validPassword: function(password, hash) {
        return bcrypt.compareSync(password, hash, console.log())
      }
    }  
  })
}