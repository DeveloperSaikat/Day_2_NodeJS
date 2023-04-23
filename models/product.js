const mongodb = require('mongodb');
const getDb = require('../util/database').getDb; //getting the db connection that is exposed
 
class Product {
    constructor(title, price, id, userId) {
        this.title = title;
        this.price = price;
        this._id = id;
        this.userId = userId;
    }

    save() {
        const db = getDb(); //Invoking the getDb function to get the client object
        let dbOp;
        if(this._id) {
            dbOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)}, { $set: this})
        }
        else {
            dbOp = db.collection('products')
            .insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch( err => {
                console.log(err);
            })
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find() //this provides a cursor that points to the data at top
            .toArray() //this converts the data into an array and sends back the whole collection data
            .then(products => {
                return products;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findById(id) {
        const db = getDb();
        return db.collection('products').findOne({_id: new mongodb.ObjectId(id)})
            .then(product => {
                return product;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static deleteById(id) {
        const db = getDb();
        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(id)})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = Product