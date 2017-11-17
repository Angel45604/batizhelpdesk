'use strict'

const setupDatabase = require('./lib/db')
const setupAreaModel = require('./models/area')
const setupProblemModel = require('./models/problem')
const setupRoleModel = require('./models/role')
const setupStatusModel = require('./models/status')
const setupUserModel = require('./models/user')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AreaModel = setupAreaModel(config)
  const ProblemModel = setupProblemModel(config)
  const RoleModel = setupRoleModel(config)
  const StatusModel = setupStatusModel(config)
  const UserModel = setupUserModel(config)

  UserModel.belongsToMany(RoleModel, {through: 'UserRole'})
  RoleModel.belongsToMany(UserModel, {through: 'UserRole'})

  ProblemModel.belongsTo(AreaModel)
  ProblemModel.belongsTo(StatusModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  // sequelize.sync()

  const Area = {}
  const Problem = {}
  const Role = {}
  const Status = {}
  const User = {}

  return {
    Area,
    Problem,
    Role,
    Status,
    User
  }
}
