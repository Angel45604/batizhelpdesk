'use strict'

module.exports = function setupStatus (StatusModel) {

  async function createOrUpdate (status) {
    const cond = {
      where: {
        status: status.status
      }
    }

    const existingStatus = await StatusModel.findOne(cond)

    if (existingStatus) {
      const updated = await StatusModel.update(status, cond)
      return updated ? StatusModel.findOne(cond) : existingStatus
    }

    const result = await StatusModel.create(status)
    return result.toJSON()
  }


  function findAll () {
    return StatusModel.findAll()
  }

  function findOne(status) {
    return StatusModel.findOne({
      where: {
        status
      }
    })
  }

  return {
    createOrUpdate,
    findAll,
    findOne
  }
}
