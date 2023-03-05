import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false
    },
    reducers: {
        productsRequest(state, action){
            return {
                loading: true
            }
        },
        productsSuccess(state, action){
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.count,
                resPerPage : action.payload.resPerPage
            }
        },
        productsFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },
        // reducers for getting admin products
        adminProductsRequest(state, action){
            return {
                loading: true
            }
        },
        adminProductsSuccess(state, action){
            return {
                loading: false,
                products: action.payload.products,
            }
        },
        adminProductsFail(state, action){
            return {
                loading: false,
                error:  action.payload
            }
        },clearError(state,action){
            return{
                ...state,
                error:null
            }
        }, outOfStockRequest: (state) => {
            state.loading = true;
          },
          outOfStockSuccess: (state, action) => {
            
            state.loading = false;
            state.products = action.payload.products;
          },
          outOfStockFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          }
    }
});

const { actions, reducer } = productsSlice;

export const { 
    productsRequest, 
    productsSuccess, 
    productsFail,
    adminProductsFail,
    adminProductsRequest,
    adminProductsSuccess,
    adminCreateProductFail,
    adminCreateProductRequest,
    adminCreateProductSuccess,
    clearError,
    outOfStockRequest,
    outOfStockSuccess,
    outOfStockFail
  
} = actions;

export default reducer;