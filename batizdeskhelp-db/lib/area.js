'use strict'

module.exports = function setupArea (AreaModel) {
    async function createOrUpdate (area) {
        const cond = {
          where: {
            area: area.area
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

    function findByArea (area) {
        return AreaModel.findOne({
            where: {
                area
            }
        })
    }

    function deleteArea (area) {
        return AreaModel.destroy({
            where: {
                area
            }
        })
    }

    return {
        createOrUpdate,
        findAll,
        findById,
        findByArea,
        deleteArea
    }
}