const Product=require('../models/productModel');
const ErrorHandler=require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures=require('../utils/apiFeactures')
//Get Products-/api/v1/products

exports.getProducts = catchAsyncError(async (req, res, next)=>{
    // res.json(req.query);
     const resPerPage = 3;
 
     let buildQuery = () => {
         return new APIFeatures(Product.find(), req.query).search().filterByPrice().filterByPrice()
     }
     
     const filteredProductsCount = await buildQuery().filterByRatings().query.countDocuments({})
     const totalProductsCount = await Product.countDocuments({});
     let productsCount = totalProductsCount;
 
     if(filteredProductsCount !== totalProductsCount) {
         productsCount = filteredProductsCount;
     }
     
     const products = await buildQuery().filterByRatings().paginate(resPerPage).query;
    
     
     res.status(200).json({
         success : true,
         count: productsCount,
         resPerPage,
         products
     })
}) 
  
  
  


//Create Product-/api/v1/products/new
exports.newProduct= catchAsyncError(async(req,res,next)=>{
    let images =[]

    if(req.files.length > 0){
        req.files.forEach( file => {
            let url = `${process.env.BACKEND_URL}/uploads/product/${file.originalname}`;
            images.push({image:url})
        })

    }
    req.body.images = images;


    req.body.user=req.user.id;
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})

//GeT Single Product-api/v1/products/:id
exports.getSingleProduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id).populate('reviews.user','name email')
    if(!product){
       return next(new ErrorHandler('product not found',400));
       
    }
    res.status(201).json({
        success:true,
        product
    })
}

//UpDate Product-api/v1/products/:id
exports.updateProduct=async(req,res,next)=>{
    let product=await Product.findById(req.params.id);

    //uploading images

    let images =[]
     ///if images not cleared we 
    if(req.body.imagesCleared === 'false'){
        images = product.images;
    }

    if(req.files.length > 0){
        req.files.forEach( file => {
            let url = `${process.env.BACKEND_URL}/uploads/product/${file.originalname}`;
            images.push({image:url})
        })

    }
    req.body.images = images;

    if(!product){
        res.status(404).json({
            success:false,
            message:'product not found'
        });
    }

    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true

    })

    res.status(200).json({
        success:true,
        product
    })
    

}
//Delete Product-api/v1/products:id
exports.deleteProduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
        res.status(404).json({
            success:false,
            message:'product no found'
        });
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:'product Delected'
    })
}

//Create Rewiew -api/v1/review

exports.createRewiew = catchAsyncError(async(req,res,next)=>{
    const {productId,rating,comment} =req.body;

    const review ={
        user : req.user.id,
        rating,
        comment

    }

    const product = await Product.findById(productId);
    //finding user review exists
    const isReviewed = product.reviews.find(review =>{
        return review.user.toString() == req.user.id.toString()
    })

    if(isReviewed){
        //updating review
        product.reviews.forEach(review =>{
            if(review.user.toString()  == req.user.id.toString()){
                review.comment = comment
                review.rating = rating
            }
        })

    }else{
        //creating review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
     // find the average of the product reviews
    product.ratings = product.reviews.reduce((acc,review)=>{
        return review.rating+acc;
    },0) / product.reviews.length;
    product.ratings = isNaN(product.ratings)?0:product.ratings

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true
    })
})
//Get Reviews-api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id).populate('reviews.user','name email');

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})
//Delete Review - api/v1/review
exports.deleteReview = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    //filtering the reviews which does match the delecting review id
    const reviews = product.reviews.filter(review => {
        return review._id.toString() !== req.query.id.toString()
    })
    //number of reviews

    const numOfReviews= reviews.length;
    //finding the average with the filtered reviews
    let ratings = product.reviews.reduce((acc,review)=>{
        return review.rating+acc;
    },0) / reviews.length;
    ratings = isNaN(ratings)?0:ratings;
    //save the product document
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success:true
    })

})

//get admin products - api/v1/admin/products

exports.getAdminProducts = catchAsyncError(async (req, res, next)=>{
    
    const products = await Product.find();

    res.status(200).json({
        success : true,
        products
    })
})



exports.getOutOfStockProducts = async (req, res, next) => {
  try {
    const outOfStockProducts = await Product.find({ stock: 0 });
    res.status(200).json({
      success: true,
      count: outOfStockProducts.length,
      products: outOfStockProducts
    });
  } catch (error) {
    next(error);
  }
};
