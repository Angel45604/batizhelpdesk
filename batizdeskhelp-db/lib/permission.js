'use strict'

module.exports = function setupPermission (PermissionModel) {
    async function createOrUpdate (permission) {
        const cond = {
          where: {
            permission: permission.permission,
            username: permission.username
          }
        }
    
        const existingPermission = await PermissionModel.findOne(cond)
    
        if (existingPermission) {
          const updated = await PermissionModel.update(area, cond)
          return updated ? PermissionModel.findOne(cond) : existingPermission
        }
    
        const result = await PermissionModel.create(permission)
        return result.toJSON()
      }
    
    function findAll () {
        return PermissionModel.findAll()
    }

    function findById (id) {
        return PermissionModel.findById(id)
    }

    function findByPermission (permission) {
        return PermissionModel.fidnAll({
            where: {
                permission
            }
        })
    }

    function deletePermission (permission, username) {
        return PermissionModel.destroy({
            where: {
                permission,
                username
            }
        })
    }

    function findByUsername (username) {
        return PermissionModel.findAll({
            where: {
                username
            }
        })
    }

    return {
        createOrUpdate,
        findAll,
        findById,
        findByPermission,
        findByUsername,
        deletePermission
    }
}