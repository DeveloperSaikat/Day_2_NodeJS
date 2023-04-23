let cart = { products: [], totalPrice: 0};

module.exports = class Cart {
    static addProduct(id, productPrice) {

        const existingProductIndex = cart.products.findIndex(p => p.id === id)
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
    
        if(existingProduct) {
            updatedProduct = { ...existingProduct};
            updatedProduct.qty = updatedProduct.qty + 1;
            cart.products = [ ...cart.products ];
            cart.products[existingProductIndex] = updatedProduct;
        }
        else {
            updatedProduct = {
                id: id,
                qty: 1
            }
            cart.products = [ ...cart.products, updatedProduct];
        }

        cart.totalPrice = cart.totalPrice + productPrice;
    }

    static getCart(cb) {
        cb(cart);
    }

    static deleteProduct(id, productPrice) {
        const updatedCart = { ...cart };
        const product = updatedCart.products.find(prod => prod.id === id);
        if(!product) {
            return;
        }

        const productQty = product.qty;
        updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
        updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty

        cart = updatedCart;

    }
}