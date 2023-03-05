const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
      }, images: [
        {
          image: {
            type: String,
            required: true,
          }
        }
      ], name: {
        type: String,
        required: true,
        trim: true,
        maxLenght: 100,
      },
      price: {
        type: Number,
        required: true,
        default: 0.0
      },
      description: {
        type: String,
        required: true,

      }, ratings: {
        type: String,
        default: 0.0
      }, category: {
        type: String,
        required: true,
        enum: {
          values: [
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
          message: 'please select correct category'
        }
      },
      seller: {
        type: String,
        required: true, 
      },
      stock: {
        type: Number,
        required: true,
        maxLenght: [20, 'product stock cannot exceed 20']
      },
      numOfReviews: {
        type: Number,
        default: 0
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
     
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },

    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Cart', cartSchema);

