const getDb = require('../util/database').getDb;

const mongodb = require('mongodb');

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        console.log("hi", product._id.toString());

        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });

        console.log(cartProductIndex, this.cart.items[cartProductIndex]);

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if(cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }
        else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: newQuantity
            });
        }
        const updatedCart = {
            items: updatedCartItems
        }

        const db = getDb();
        return db.collection('users')
            .updateOne({_id: new mongodb.ObjectId(this._id)},
                {$set: {cart: updatedCart}})
            .then(result => {
                console.log('Cart updated');
            })
            .catch(err => {
                console.log(err);
            })
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(i => {
            return i.productId; //Every cart item has productid and quantity
        });

        return db.collection('products')
                .find({_id: { $in: productIds}}) //fetch me a product that has the id similar to one present in the productIds
                .toArray()
                .then(products => {
                    return products.map(p => {
                        return {
                            ...p,
                            quantity: this.cart.items.find( i => {
                                return i.productId.toString() === p._id.toString();
                            }).quantity
                        };
                    });
                })
    }

    deleteProduct(prodId) {
        const db = getDb();
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== prodId.toString();
        })

        return db.collection('users')
        .updateOne({_id: new mongodb.ObjectId(this._id)},
            {$set: {cart: {
                items: updatedCartItems
            }}})
        .then(result => {
            console.log('Cart updated');
        })
        .catch(err => {
            console.log(err);
        })
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }

}

module.exports = User