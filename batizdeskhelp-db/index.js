'use strict'

const setupDatabase = require('./lib/db')
const setupAreaModel = require('./models/area')
const setupProblemModel = require('./models/problem')
const setupRoleModel = require('./models/role')
const setupStatusModel = require('./models/status')
const setupUserModel = require('./models/user')
const setupConfigModel = require('./models/config')
const setupNNModel = require('./models/nn')

const setupArea = require('./lib/area')
const setupProblem = require('./lib/problem')
const setupStatus = require('./lib/status')
const setupUser = require('./lib/user')
const setupConfig = require('./lib/config')
const setupRole = require('./lib/role')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AreaModel = setupAreaModel(config)
  const ProblemModel = setupProblemModel(config)
  const RoleModel = setupRoleModel(config)
  const StatusModel = setupStatusModel(config)
  const UserModel = setupUserModel(config)
  const ConfigModel = setupConfigModel(config)
  

  await sequelize.authenticate()

  setupNNModel(config, UserModel, AreaModel)
  setupNNModel(config, UserModel, ProblemModel)
  setupNNModel(config, UserModel, RoleModel)
  setupNNModel(config, ProblemModel, AreaModel)
  setupNNModel(config, AreaModel, RoleModel)
  setupNNModel(config, RoleModel, ProblemModel)
  
  if (config.setup) {
    await sequelize.sync({ force: true })
  }
  //UserModel.create()
  // sequelize.sync()

  const Area = setupArea(AreaModel)
  const Problem = setupProblem(ProblemModel)
  const Role = setupRole(RoleModel)
  const Status = setupStatus(StatusModel)
  const User = setupUser(UserModel)
  const Config = setupConfig(ConfigModel)

  return {
    Area,
    Problem,
    Role,
    Status,
    User,
    Config
  }
}
