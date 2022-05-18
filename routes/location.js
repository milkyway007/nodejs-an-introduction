const express = require('express');
const mongoDb = require('mongodb');  
const MongoClient = mongoDb.MongoClient;

const router = express.Router();

const uri =
  "mongodb+srv://Liidia:milkyway@cluster0.wmtrq.mongodb.net/locations?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const locationStorage = {
    locations: [],
};

router.post('/add-location', (request, response, next) => {
    const address = {
        address: request.body.address,
        coords: {
            lat: request.body.coords.lat,
            lng: request.body.coords.lng,
        }
    };

    client.connect(function(err, client) {

        const db = client.db('locations');

        db.collection('user-locations').insertOne(address, function(err, r) {
            console.log(r);
            response.json({message: 'Stored location!', locId: r.insertedId})
        })
    });
});

router.get('/location/:lid', (request, response, next) => {
    const locationId = request.params.lid;

    client.connect(function(err, client) {

        const db = client.db('locations');

        db.collection('user-locations').findOne(
        {
            _id: new mongoDb.ObjectId(locationId),
        }, function(err, doc) {
            if (!doc) {
                return response.status(404).json({message: 'Not found!'});
            }
        
            response.json({address: doc.address, coordinates: doc.coords});
        })
    });
});

module.exports = router;