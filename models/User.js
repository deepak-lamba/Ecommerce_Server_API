const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    cart: {
      products: [
        {
          productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
          quantity: { type: Number, required: true }
        }
      ]
    }
}, {timestamps: true});


// method to add a product to user's cart
userSchema.methods.addToCart = function(productId) {
  const cartProductIdx = this.cart.products.findIndex(p => {
    return p.productId.toString() === productId.toString();
  });

  let updatedCartProducts = [...this.cart.products];
  if (cartProductIdx >= 0) {
    // product in cart, update its quantity
    updatedCartProducts[cartProductIdx].quantity = this.cart.products[cartProductIdx].quantity + 1;
  } else {
    // add a new product
    updatedCartProducts.push({
      productId: productId,
      quantity: 1
    });
  }
  this.cart = {products: updatedCartProducts};
  return this.save();
};

// method to remove a product from user's cart
userSchema.methods.deleteFromCart = function(productId) {
  const updatedCartProducts = this.cart.products.filter(p => {
    return p.productId.toString() !== productId.toString();
  });
  this.cart.products = updatedCartProducts;
  return this.save();
};

// method to update a product to user's cart
userSchema.methods.updateProductInCart = function(productId, productData) {
  const cartProductIdx = this.cart.products.findIndex(p => {
    return p.productId.toString() === productId.toString();
  });
  // throw error if product not in cart? or add it?
  let updatedCartProducts = [...this.cart.products];
  const mutableProductProperties = ["quantity"]; // only the mutable properties as per api to be allowed to be updated
  for (const key in productData) {
    if (mutableProductProperties.includes(key)) {
      updatedCartProducts[cartProductIdx]["quantity"] = productData["quantity"];
    }
  }
  this.cart.products = updatedCartProducts;
  return this.save();
};

// method to clear cart, esp. after placing order
userSchema.methods.clearCart = function() {
  this.cart = {"products": []};
  return this.save();
};

const User = mongoose.model('User', userSchema);
module.exports = {User};
