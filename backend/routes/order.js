const express = require('express');
const { newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder, updateCartItem } = require('../controller/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const { addToCart, deleteFromCart } = require('../controller/orderController');
const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser,myOrders);
router.route('/cart/add/').post(isAuthenticatedUser,addToCart)
router.route('/cart/remove/:id').delete(isAuthenticatedUser,deleteFromCart)
router.route('/cart/:id/:action').patch(isAuthenticatedUser,updateCartItem)

//Admin Routes

router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles('admin'),orders)
router.route('/admin/order/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder)
router.route('/admin/order/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder)


 
module.exports = router;