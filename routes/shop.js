const path = require('path'); // Creates the absolute path required 
const express = require('express');
const router = express.Router();

//const adminData = require('./admin');

const productController = require('../controller/products');
const shopController = require('../controller/shop');

// router.get('/', (req,res,next) => { // Using the HTTP method instead of 'use' does an exact match
//     console.log(adminData.products);
//     res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); //Takes in the absolute path from os level to the current folder
//     //In path we use join to add the parameters in the path that is being created
// });

// router.get('/', (req,res,next) => { // Using the HTTP method instead of 'use' does an exact match
//     res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); //Takes in the absolute path from os level to the current folder
//     //In path we use join to add the parameters in the path that is being created
//     //const products = adminData.products;
//     res.render('shop', productController.getProducts);
// });

router.get('/', productController.getProducts);

router.get('/add-to-cart', shopController.getCart);
router.post('/delete-cart-item', shopController.postCartDeleteProduct);

router.post('/add-to-cart', shopController.postCart);
router.get('/:productId', productController.getProduct);



module.exports = router; // This 'router' can now be used as middleware