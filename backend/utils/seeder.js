const products=require('../data/products.json');
const product=require('../models/productModel');
const dotenv=require('dotenv');
const connectDatabase=require('../config/database')

dotenv.config({path:"config/config.env"})
connectDatabase();
const seedProducts=async()=>{
    try{
    await product.deleteMany()
    console.log('Products delected');
    await product.insertMany(products)
    console.log('All products added')
    }catch(err){
        console.log(err.message)
    }
}

seedProducts()