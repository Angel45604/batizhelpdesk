'use strict'

module.exports = function setupProblem (ProblemModel) {
  const Sequelize = require('sequelize')
  const Op = Sequelize.Op

  async function createOrUpdate (problem) {
    const cond = {
      where: {
        folio: problem.folio
      }
    }

    const existingProblem = await ProblemModel.findOne(cond)

    if (existingProblem) {
      const updated = await ProblemModel.update(problem, cond)
      return updated ? ProblemModel.findOne(cond) : existingProblem
    }

    const result = await ProblemModel.create(problem)
    return result.toJSON()
  }

  function findByFolio (folio) {
    return ProblemModel.findOne({
      where: {
        folio
      }
    })
  }

  function findAll () {
    return ProblemModel.findAll()
  }

  function findAllCurrentActive () {
    return ProblemModel.findAll({
      where: {
        [Op.or]: [{statusId: 0}, {statusId: 1}, {statusId: 2}]
      }
    })
  }

  function findAllUncurrentActive () {
    return ProblemModel.findAll({
      where: {
        statusId: 3
      }
    })
  }

  function findAllGreen () {
    return ProblemModel.findAll({
      where: {
        statusId: 0
      }
    })
  }

  function findAllYellow () {
    return ProblemModel.findAll({
      where: {
        statusId: 1
      }
    })
  }

  function findAllRed () {
    return ProblemModel.findAll({
      where: {
        statusId: 2
      }
    })
  }

  function findByUsername (username) {
    return ProblemModel.findAll({
      where: {
        username
      }
    })
  }

  function findByArea (area) {
    return ProblemModel.findAll({
      where: {
        area
      }
    })
  }

  return {
    createOrUpdate,
    findByFolio,
    findAll,
    findAllCurrentActive,
    findAllUncurrentActive,
    findAllGreen,
    findAllYellow,
    findAllRed,
    findByUsername,
    findByArea
  }
}
