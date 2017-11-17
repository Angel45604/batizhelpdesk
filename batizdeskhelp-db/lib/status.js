'use strict'

module.exports = function setupStatus (StatusModel) {

  function findAll () {
    return StatusModel.findAll()
  }

  return {
    findAll
  }
}
