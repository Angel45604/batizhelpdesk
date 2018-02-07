'use strict'

module.exports = function setupNN (NNModel) {
    async function createOrUpdate(mod1, mod2){
        const cond = {
            where:{}
        }
        cond['where'][mod1.tableName + 'Id'] = mod1.id
        cond['where'][mod2.tableName + 'Id'] = mod2.id

        const existingNNRegistry = await NNModel.findOne(cond)
        if(existingNNRegistry){
            
        }
    }
}