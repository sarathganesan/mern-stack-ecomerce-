const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true,
        maxLenght:[100,"product name cannot exceed 100 characters"]
    },
    price:{
        type:Number,
        required:true,
        default:0.0
    },
    description:{
        type:String,
        required:[true,"please enter product description"],
        
    },
    ratings: {
        type: String,
        default:0.0
    },
    images:[
        {
            image:{
                type:String,
                required:true,
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please enter product category"],
        enum:{
            values:[
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'HeadPhones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message:'please select correct category'
        }
    },
    seller:{
        type:String,
        required:[true,'please enter product seller']
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLenght:[20,'product stock cannot exceed 20']
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

let schema = mongoose.model('product',productSchema)
module.exports = schema