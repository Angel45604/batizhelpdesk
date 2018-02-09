'use strict'

module.exports = function setupProblem (ProblemModel) {
  const Sequelize = require('sequelize')
  const Op = Sequelize.Op

  async function createOrUpdate (problem, user, area) {
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
    let rela = await result.addArea(area)
    await result.addUser(user);
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
        status: true
      }
    })
  }

  function findAllUncurrentActive () {
    return ProblemModel.findAll({
      where: {
        status: false
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

  function findByUsernameAndArea (username, area) {
    return ProblemModel.findAll({
      where: {
        area,
        username
      }
    })
  }

  function checkProblem (folio) {

    return ProblemModel.update({
      status: true,
    }, {
      where: {
        folio
      }
    })
  }

  function deleteProblem (folio) {
    return ProblemModel.destroy({
      where: {
        folio
      }
    })  
  }

  return {
    createOrUpdate,
    findByFolio,
    findAll,
    findAllCurrentActive,
    findAllUncurrentActive,
    findByUsername,
    findByArea,
    findByUsernameAndArea,
    checkProblem,
    deleteProblem
  }
}
