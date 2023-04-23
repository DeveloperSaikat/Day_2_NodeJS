const express = require('express');
const path = require('path');

const router = express.Router();

const productController = require('../controller/products');

const products = [];
//All routes are added with /admin at front
// router.get('/add-product', (req, res, next) => {
//     //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')); 
//     res.render('add-product', productController.getAddProduct);
// });

//the order matters here as we are not using next() and this should only go to a specific route
// router.post('/product',(req,res,next) => {
//     products.push({title: req.body.message});
//     //res.redirect('/'); // This sets the headers and passes this as body to the Html

//     res.render('shop',  productController.postAddProduct);
// });

router.get('/add-product', productController.getAddProduct); //calling the required controller
router.post('/product', productController.postAddProduct);

router.get('/edit-product/:productId', productController.getEditProduct);
router.post('/edit-product', productController.postEditProduct);
router.post('/delete-product', productController.deleteProduct);

module.exports = {
    router,
    products
 } // This 'router' can now be used as middleware

// exports.router = router;
// exports.products = products;