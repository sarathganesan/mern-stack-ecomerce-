const Cart = require('../models/cartModel');
const catchAsyncError = require('../middlewares/catchAsyncError')
const Order = require('../models/ordermodel');
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler');

//Create New Order-api/v1/order/new
exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body;
     
   
    
    // Create a new order
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user.id
    })


     

    // Reduce the stock of the products in the order
    for (let i = 0; i < orderItems.length; i++) {
        const item = orderItems[i];
        const product = await Product.findById(item.product);

        product.stock -= item.quantity;
        product.numOfReviews = product.reviews.length;

        await product.save({ validateBeforeSave: false });
    }

    

    res.status(200).json({
        success:true,
        order
    });
});


// Add item to cart - api/v1/cart/add

exports.addToCart = catchAsyncError(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
  
    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });
  
    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ user: userId });
    }
  
    // Check if the product is already in the cart
    const cartItem = cart.cartItems.find(
      item => item.product.toString() === productId
    );
  
    if (cartItem) {
      // If the product is already in the cart, update the quantity
      cartItem.quantity = quantity;
    } else {
      // If the product is not in the cart, add it as a new item
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
  
      cart.cartItems.push({
        product: productId,
        images: product.images,
        name: product.name,
        price: product.price,
        description: product.description,
        ratings: product.ratings,
        category: product.category,
        seller: product.seller,
        stock: product.stock,
        reviews: product.reviews,
        numOfReviews: product.numOfReviews,
        quantity,
      });
    }
  
    // Save the cart to the database
    await cart.save();
  
    return res.status(200).json({
      success: true,
      cart,
    });
});
  
  
  
  



// Remove item from cart - api/v1/cart/remove
exports.deleteFromCart = catchAsyncError(async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
  
    // Delete the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    
  
    // Remove the product from the user's cart
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found',
        });
      }
  
      const cartItemIndex = cart.cartItems.findIndex(
        item => item.product.toString() === productId
      );
  
      if (cartItemIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Item not found in cart',
        });
      }
  
      cart.cartItems.splice(cartItemIndex);
      await cart.save();
  
      return res.status(200).json({
        success: true,
        cart,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
});
  
exports.updateCartItem = catchAsyncError(async (req, res) => {
    const userId = req.user.id;
    const { id, action } = req.params;
    
    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }
    
    const cartItemIndex = cart.cartItems.findIndex(
      item => item.product.toString() === id
    );
    
    if (cartItemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }
    
    const cartItem = cart.cartItems[cartItemIndex];
    
    if (action === 'increase') {
      // Increase the quantity of the cart item
      cartItem.quantity += 1;
    } else if (action === 'decrease') {
      // Decrease the quantity of the cart item, but not below 1
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        return res.status(400).json({
          success: false,
          message: 'Quantity cannot be less than 1',
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid action',
      });
    }
    
    // Save the updated cart to the database
    await cart.save();
    
    return res.status(200).json({
      success: true,
      cart,
    });
});
  
    

  
  
  
  
  
  


//Get Single Order-api/v1/order/:id


exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
    
    
    
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
  
    if(!order){
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id} `,404))
    }
    res.status(200).json({
        success:true,
        order
    })

})

//Get Logged in User Orders-api/v1/myorders
exports.myOrders= catchAsyncError(async(req,res,next)=>{
    
    
    
    const orders = await Order.find({user: req.user.id});
    
  
   
    res.status(200).json({
        success:true,
        orders
    })

})

//Admin: Get All Orders - api/v1/orders
exports.orders = catchAsyncError(async(req,res,next)=>{

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order=>{
        totalAmount +=  order.totalPrice
    })
    
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })

})

//Admin:Update Orders - Order Status- api/v1/order/:id
exports.updateOrder =  catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(order.orderStatus == 'Delivered') {
        return next(new ErrorHandler('Order has been already delivered!', 400))
    }
    //Updating the product stock of each order item
    

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({
        success: true
    })
    
});

//Admin:Delete Order - api/v1/order/:id
exports.deleteOrder = catchAsyncError(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id} `,404))
    }
    await order.remove();
    res.status(200).json({
        success:true
    })


})
