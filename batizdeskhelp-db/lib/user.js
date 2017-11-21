'use strict'

module.exports = function setupUser (UserModel) {
  function findById (id) {
    return UserModel.findById(id)
  }

  function findByUserName (username) {
    return UserModel.findOne({
      where: {
        username
      }
    })
  }

  function findByEmail (email) {
    return UserModel.findOne({
      where: {
        email
      }
    })
  }

  return {
    findById,
    findByUserName,
    findByEmail
  }
}
