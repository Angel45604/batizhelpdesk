'use strict'

module.exports = function setupUser (UserModel, RoleModel) {

  async function createOrUpdate (user) {
    const cond = {
      where: {
        email: user.email
      }
    }

    const existingUser = await UserModel.findOne(cond)

    if (existingUser) {
      const updated = await UserModel.update(user, cond)
      return updated ? UserModel.findOne(cond) : existingUser
    }

    const result = await UserModel.create(user)
    return result.toJSON()
  }

  function findAll() {
    return UserModel.findAll()
  }

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

  function validPassword(password) {
    console.log(`PASSWORD ${password}`)
    console.log(UserModel)
    return UserModel.validPassword(password)
  }

  function findByEmail (email) {
    return UserModel.findOne({
      where: {
        email
      }
    })
  }

  function deleteUser (email) {
    return UserModel.destroy({
      where: {
        email
      }
    })
  }
  function getAreas(user){
    return findByEmail(user.email).then(us => {
      return us.getAreas().then(ars => {
        return ars
      })
    })
  }
  function addArea(user, AreaModel, area){
    console.log('----------------------', area)
    return UserModel.findOne({
      where: {
        id: user.id
      }
    }).then(us => {
      AreaModel.findById(area.id).then(ar => {
        us.addArea(ar);
      })
    })
  }
  return {
    findAll,
    createOrUpdate,
    findById,
    findByUserName,
    findByEmail,
    validPassword,
    deleteUser,
    addArea,
    getAreas
  }
}
