const express = require('express');
const collectionService = require('./Service');
const collectionRouter = express.Router();
collectionRouter.route('/nft-create').post(createCollection);
function createCollection(request, response) {
    const value = request.body;
    console.log(value);
    collectionService.create(
        value,
        data => response.status(201).json(data),
        error => response.status(400).json(error),
    );
}

collectionRouter.route('/nft-get').get(getAllCollection)
function getAllCollection(request,response){
collectionService.getCol(
    data => response.status(201).json(data),
    error => response.status(400).json(error),
);

}

collectionRouter.route('/nft-delete/:id').delete(deleteById)
function deleteById(request,response){
    console.log(request);
    const id = request.params.id;

    collectionService.deleteCol(
        id,
        data => response.status(201).json(data),
        error => response.status(400).json(error),
    );
}

collectionRouter.route('/nft-update/:id').put(updateByID)
function updateByID(request,response){
    const id = request.params.id;
    const data = request.body;
    collectionService.updateCol(
        id,data,
        data => response.status(201).json(data),
        error => response.status(400).json(error),
    );
}

module.exports = collectionRouter;