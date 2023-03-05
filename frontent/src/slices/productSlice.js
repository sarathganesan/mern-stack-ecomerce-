import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product: {},
        isReviewSubmitted: false,
        isProductCreated: false,
        isProductDeleted: false,
        isReviewDeleted: false,
        isProductUpdated: false,
        reviews : []
    },
    reducers: {
        productRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        productSuccess(state, action){
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        productFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        createReviewRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        createReviewSuccess(state, action){
            return {
                ...state,
                loading: false,
                isReviewSubmitted: true
            }
        },
        createReviewFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
            }
        },
        clearError(state, action) {
           return{ ...state,
            error: null
           }
        },
        clearProduct(state, action) {
            return{ ...state,
                product : {}
            }
        },
        // reducers for admin creating new product
        newProductRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        newProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                //  check postman "Create new product" request getting "product" in response
                product: action.payload.product,
                isProductCreated: true,
            }
        },
        newProductFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
                isProductCreated:false
            }
        },
        clearProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false
            }
        },
         // reducers for admin deleting  product
        deleteProductRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                isProductDeleted: true,
            }
        },
        deleteProductFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearProductDeleted(state, action) {
            return {
                ...state,
                isProductDeleted: false
            }
        },
        updateProductRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        updateProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                //  check postman "Create new product" request getting "product" in response
                product: action.payload.product,
                isProductUpdated: true,
            }
        },
        updateProductFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearProductUpdated(state, action) {
            return {
                ...state,
                isProductUpdated: false
            }
        },
        reviewsRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        reviewsSuccess(state, action){
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews,
            }
        },
        reviewsFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        // reducers for admin deleting  product
        deleteReviewRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteReviewSuccess(state, action){
            return {
                ...state,
                loading: false,
                isReviewDeleted: true,
            }
        },
        deleteReviewFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false
            }
        }, addOutOfStockProduct(state, action) {
            const productId = action.payload;
            if (!state.outOfStockProducts.includes(productId)) {
                return {
                    ...state,
                    outOfStockProducts: [...state.outOfStockProducts, productId]
                }
            }
            return state;
        },
        removeOutOfStockProduct(state, action) {
            const productId = action.payload;
            if (state.outOfStockProducts.includes(productId)) {
                return {
                    ...state,
                    outOfStockProducts: state.outOfStockProducts.filter(id => id !== productId)
                }
            }
            return state;
        }
    
    }
});

const { actions, reducer } = productSlice;

export const { 
    productRequest, 
    productSuccess, 
    productFail,
    createReviewFail,
    createReviewRequest,
    createReviewSuccess,
    clearError,
    clearReviewSubmitted,
    clearProduct,
    newProductRequest,
    newProductFail,
    newProductSuccess,
    clearProductCreated,
    deleteProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    clearProductDeleted,
    updateProductFail,
    updateProductRequest,
    updateProductSuccess,
    clearProductUpdated,
    reviewsRequest,
    reviewsSuccess,
    reviewsFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail,
    clearReviewDeleted
} = actions;

export default reducer;