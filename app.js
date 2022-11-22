const cron = require('node-cron')
const collectionRouter = require('./Collections/Controller')
const mongoose = require('mongoose')
const sdk = require('api')('@opensea/v1.0#bg4ikl1mk428b')
const express = require('express')
const collectionService = require('./Collections/Service')


const app = express()

const fetchData = () => {
    sdk.retrievingCollectionStats({collection_slug: 'doodles-official'})
        .then(res => console.log(res)
                        // collectionRouter.route().post(()=>{collectionService.create(res,data => response.status(201).json(data),
                        //     error => response.status(400).json(error),)})}
               ) //get all from collection
        .catch(err => console.error(err));
}

const startServer = () => {
    app.listen(3000, () => console.log(`Server is running on port 3000`))
}

const startDatabaseConnection = () => {
    mongoose.connect('mongodb://localhost:27017/', () => console.log('Connected to Database'))
}

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