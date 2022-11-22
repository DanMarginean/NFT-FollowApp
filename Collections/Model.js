const mongoose = require('mongoose')
const { Schema } = mongoose

const collectionSchema = new Schema({
    floor_price: String,
    date: { type: Date, default: Date.now },
    total_supply:String,
    num_owners:String,
    name:String,
    total_volume:String,
    seven_day_sales:String
})

const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection