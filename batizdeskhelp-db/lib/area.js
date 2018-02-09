'use strict'

module.exports = function setupArea (AreaModel) {
    async function createOrUpdate (area) {
        const cond = {
          where: {
            name: area.name
          }
        }
    
        const existingArea = await AreaModel.findOne(cond)
    
        if (existingArea) {
          const updated = await AreaModel.update(area, cond)
          return updated ? AreaModel.findOne(cond) : existingArea
        }
        
        const result = await AreaModel.create(area)
        return result.toJSON()
    }
    
    function findAll () {
        return AreaModel.findAll()
    }

    function findById (id) {
        return AreaModel.findById(id)
    }

    function findByName (name) {
        return AreaModel.findOne({
            where: {
                name: name
            }
        })
    }

    function deleteArea (name) {
        return AreaModel.destroy({
            where: {
                name
            }
        })
    }

    return {
        createOrUpdate,
        findAll,
        findById,
        findByName,
        deleteArea
    }
}