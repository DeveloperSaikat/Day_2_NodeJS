const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
    MongoClient.connect('your_url')
    .then(result => {
        console.log('Connected');
        _db = result.db();
        cb();
    })
    .catch(err => {
        console.log(err);
    })
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No Database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
