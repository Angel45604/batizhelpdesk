'use strict'

module.exports = function setupArea (AreaModel) {
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

    return {
        findAll,
        findById,
        findByArea
    }
}