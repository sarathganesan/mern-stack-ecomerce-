const express=require('express');
const multer = require('multer');
const path = require('path')
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createRewiew, getReviews, deleteReview, getAdminProducts, getOutOfStockProducts } = require('../controller/productController');
const router=express.Router();
const {isAuthenticatedUser, authorizeRoles}=require('../middlewares/authenticate')

const upload =  multer({storage: multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,path.join(__dirname,'..','uploads/product'))
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
}) })

router.route('/products').get(getProducts)
router.route('/product/:id').get(getSingleProduct)
router.route('/review').put(isAuthenticatedUser,createRewiew)



//Admin routes

router.route('/admin/products/new').post(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'),newProduct)
router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles('admin'),getAdminProducts)
router.route('/admin/products/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/admin/products/:id').put(isAuthenticatedUser, authorizeRoles('admin'),upload.array('images'), updateProduct);
router.route('/admin/reviews').get(isAuthenticatedUser, authorizeRoles('admin'),getReviews)
router.route('/admin/review').delete(isAuthenticatedUser, authorizeRoles('admin'),deleteReview)
router.route('/admin/products/outofstock').get(isAuthenticatedUser,authorizeRoles('admin'),getOutOfStockProducts)


module.exports=router;