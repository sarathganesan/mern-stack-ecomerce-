import { createSlice } from "@reduxjs/toolkit";

const outofStockSlice = createSlice({
     name: 'products',
     initialState : {
        loading: false,
        error: null,
        products: [],
        productsCount: 0,
        resPerPage: 0,
        outOfStockProducts: []
    },
    reducers: {
        outOfStockproductsRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        outOfStockproductsSuccess(state, action){
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.count,
                resPerPage: action.payload.resPerPage,
                outOfStockProducts: action.payload.outOfStockProducts // new state property
            }
        },
        outOfStockproductsFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
})

const { actions, reducer } =outofStockSlice;

export const {
    outOfStockproductsRequest,
    outOfStockproductsSuccess,
    outOfStockproductsFail

} = actions

export default reducer;