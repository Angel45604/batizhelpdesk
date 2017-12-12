'use strict'

module.exports = function setupConfig (ConfigModel) {
    async function createOrUpdate (config) {
        const cond = {
          where: {
            config: config.config
          }
        }
    
        const existingConfig = await ConfigModel.findOne(cond)
    
        if (existingConfig) {
          const updated = await ConfigModel.update(config, cond)
          return updated ? ConfigModel.findOne(cond) : existingConfig
        }
    
        const result = await ConfigModel.create(config)
        return result.toJSON()
      }
    
    function findAll () {
        return ConfigModel.findAll()
    }

    function findById (id) {
        return ConfigModel.findById(id)
    }

    function findByConfig (config) {
        return ConfigModel.findOne({
            where: {
                config
            }
        })
    }

    function deleteOne (config) {
        return ConfigModel.destroy({
            where: {
                config
            }
        })
    }

    return {
        createOrUpdate,
        findAll,
        findById,
        findByConfig,
        deleteOne
    }
}