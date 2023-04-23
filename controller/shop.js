const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log('prodId', prodId);
    Product.findById(prodId)
        .then(product => {
            console.log("post cart", product._id);
            req.user.addToCart(product)
            .then(result =>  {
                console.log('item added in cart')
                res.redirect('/product/add-to-cart');            
            }) 
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
            .then(cart => {      
                console.log("getCart", cart);    
                res.render('cart', {
                    pageTitle: 'Cart Page',
                    prods: cart
                });
            })
            .catch(err =>{
                console.log(err);
            })
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    req.user.deleteProduct(prodId)
        .then(() =>{
            console.log("Cart Item deleted");
            res.redirect('/product/add-to-cart');
        })
        .catch(err => {
            console.log(err);
        })
}