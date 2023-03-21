const collectionModel = require('./Model')
const {request} = require("express");

const collectionService = {

    create: (collection, success, fail) => {
        collectionModel.create(collection)
            .then(data => success(data))
            .catch(error => fail(error))
    },


    getCol: (success, fail) => {
        collectionModel.find()
            .then(data => success(data))
            .catch(error => fail(error))
    },

    deleteCol: (id, success, fail) => {
        collectionModel.deleteOne({_id: id})
            .then(data => success(data))
            .catch(error => fail(error))
    },

    updateCol: (id,updateData,success,fail) => {
       updateData = {
            floor_price: request.body.floor_price,
            total_supply:request.body.total_supply,
            num_owners:request.body.num_owners,
            name:request.body.name,
            total_volume:request.body.total_volume,
            seven_day_sales:request.body.seven_day_sales
        }

        collectionModel.findOneAndUpdate(id,{$set:updateData})
            .then(data =>success(data))
            .catch(error =>fail(error))
    }
}
module.exports = collectionService