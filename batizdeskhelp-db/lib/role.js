'use strict'

module.exports = function setupRole (RoleModel) {
    async function createOrUpdate (role) {
        const cond = {
          where: {
            name: role.name,
          }
        }
    
        const existingRole = await RoleModel.findOne(cond)
    
        if (existingRole) {
          const updated = await RoleModel.update(role, cond)
          return updated ? RoleModel.findOne(cond) : existingRole
        }
    
        const result = await RoleModel.create(role)
        return result.toJSON()
      }
    
    function findAll () {
        return RoleModel.findAll()
    }

    function findById (id) {
        return RoleModel.findById(id)
    }

    function findByName (name) {
        return RoleModel.findAll({
            where: {
                name
            }
        })
    }

    function deleteRole (e, username) {
        return RoleModel.destroy({
            where: {
                role,
                username
            }
        })
    }

    function findByUsername (username) {
        return RoleModel.findAll({
            where: {
                username
            }
        })
    }

    function getUsers () {
        return RoleModel.getUsers()
    }

    return {
        createOrUpdate,
        findAll,
        findById,
        findByRole,
        findByUsername,
        deleteRole
    }
}