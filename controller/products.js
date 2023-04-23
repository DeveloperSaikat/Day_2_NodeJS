const mongodb = require('mongodb');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        title: 'Add product', 
        pageTitle: 'Add product page',
        editing: false
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        res.render('add-product', {
            title: 'Edit product', 
            pageTitle: 'Edit product page',
            editing: editMode,
            product: product[0]
        });
    }) 
    .catch(err => {
        console.log(err);
    })   
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.message, Math.floor(Math.random()*(999-100)), null, req.user._id); //Interacting with model and creating the Product
    product.save()
        .then(result => {
            res.redirect('/product/');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const prodPrice = +req.body.productPrice;
    const prodTitle = req.body.message;
    const updatedProduct = new Product(prodTitle, prodPrice,  new mongodb.ObjectId(prodId));
    updatedProduct.save();
    res.redirect('/product/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop', {
                prods: products, 
                pageTitle: 'Shop Home Page',
                title: 'All products'
            })
        })
        .catch(err => {
            console.log(err);
        })    
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        res.render('product-detail', {
            product: product[0],
            pageTitle: product[0].title
        });
    })
    .catch(err => {
        console.log(err);
    }) 
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then(() => {
            console.log('Deleted Product');
            res.redirect('/product');
        })
        .catch(err => {
            console.log(err);
        })
}