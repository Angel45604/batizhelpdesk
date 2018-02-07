'use strict'

const setupDatabase = require('./lib/db')
const setupAreaModel = require('./models/area')
const setupProblemModel = require('./models/problem')
const setupPermissionModel = require('./models/permission')
const setupStatusModel = require('./models/status')
const setupUserModel = require('./models/user')
const setupConfigModel = require('./models/config')
const setupNNModel = require('./models/nn')

const setupArea = require('./lib/area')
const setupProblem = require('./lib/problem')
const setupStatus = require('./lib/status')
const setupUser = require('./lib/user')
const setupConfig = require('./lib/config')
const setupPermission = require('./lib/permission')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AreaModel = setupAreaModel(config)
  const ProblemModel = setupProblemModel(config)
  const PermissionModel = setupPermissionModel(config)
  const StatusModel = setupStatusModel(config)
  const UserModel = setupUserModel(config)
  const ConfigModel = setupConfigModel(config)
  

  await sequelize.authenticate()
  setupNNModel(config, UserModel, AreaModel)


  if (config.setup) {
    await sequelize.sync({ force: true })
  }
 
  // sequelize.sync()

  const Area = setupArea(AreaModel)
  const Problem = setupProblem(ProblemModel)
  const Permission = setupPermission(PermissionModel)
  const Status = setupStatus(StatusModel)
  const User = setupUser(UserModel)
  const Config = setupConfig(ConfigModel)

  return {
    Area,
    Problem,
    Permission,
    Status,
    User,
    Config
  }
}
