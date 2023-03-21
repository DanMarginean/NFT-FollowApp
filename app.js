const cron = require('node-cron')
const collectionRouter = require('./Collections/Controller')
const mongoose = require('mongoose')
const sdk = require('api')('@opensea/v1.0#bg4ikl1mk428b')
// const request = require(`request-promise`)
const express = require('express')
const collectionService = require('./Collections/Service')
const collectionModel = require('./Collections/Model')
const {Collection} = require("mongoose");



const app = express()


const startServer = () => {
    app.listen(4000, () => console.log(`Server is running on port 4000`))
}

const startDatabaseConnection = () => {
    mongoose.connect('mongodb://localhost:27017/', () => console.log('Connected to Database'))
}

const DataSchema = new mongoose.Schema({
    floor_price: String,
    date: { type: Date, default: Date.now },
total_supply:String,
    num_owners:String,
    name:String,
    total_volume:String,
    seven_day_sales:String
})
const DataModel = mongoose.model(`Data`,DataSchema);
const fetchData = () => {

    sdk.retrievingCollectionStats({collection_slug: 'doodles-official'})
        .then(asset => {console.log(asset)
                // res( (asset)=>{
                const data = new Collection({
                    seven_day_sales:asset.stats.seven_day_sales,
                    total_volume:asset.stats.total_volume,
                    num_owners:asset.stats.num_owners,
                    floor_price:asset.stats.floor_price,
                    total_supply:asset.stats.total_supply
                });
                data.save();
                });

};


const initRoutes = () => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');
        next();
    });
    app.use(express.json());
    app.use('/api/collections', collectionRouter);
}
const startApp = () => {
    startServer()
    startDatabaseConnection()
    initRoutes()
}

startApp()
const refreshData = () =>{

}
// cron.schedule('*/10 * * * * *', fetchData, {})