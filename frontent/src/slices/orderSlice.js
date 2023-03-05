import { createSlice } from "@reduxjs/toolkit";



const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetail: {},
        userOrders : [],
        adminOrders : [],
        loading: false,
        isOrderDeleted: false,
        isOrderUpdated: false
    },
    reducers: {
        createOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        createOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload.order
            }
        },
        createOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        userOrdersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                userOrders: action.payload.orders
            }
        },
        userOrdersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        orderDetailRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        orderDetailSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload.order
            }
        },
        orderDetailFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
         // reducers for getting admin products
        adminOrdersRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        adminOrdersSuccess(state, action){
            return {
                ...state,
                loading: false,
                adminOrders: action.payload.orders,
            }
        },
        adminOrdersFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
         // reducers for admin deleting  product
         deleteOrderRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteOrderSuccess(state, action){
            return {
                ...state,
                loading: false,
                isOrderDeleted: true,
            }
        },
        deleteOrderFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearOrderDeleted(state, action) {
            return {
                ...state,
                isOrderDeleted: false
            }
        },
        updateOrderRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        updateOrderSuccess(state, action){
            return {
                ...state,
                loading: false,
                isOrderUpdated: true,
            }
        },
        updateOrderFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearOrderUpdated(state, action) {
            return {
                ...state,
                isOrderUpdated: false
            }
        },
        clearOrder(state, action) {
            return{ ...state,
                product : {}
            }
        },
    }
});

const { actions, reducer } = orderSlice;

export const { 
    createOrderFail,
    createOrderSuccess,
    createOrderRequest,
    clearError,
    userOrdersFail,
    userOrdersSuccess,
    userOrdersRequest,
    orderDetailFail,
    orderDetailSuccess,
    orderDetailRequest,
    adminOrdersRequest,
    adminOrdersSuccess,
    adminOrdersFail,
    updateOrderFail,
    updateOrderRequest,
    updateOrderSuccess,
    clearOrderUpdated,
    deleteOrderFail,
    deleteOrderRequest,
    deleteOrderSuccess,
    clearOrderDeleted,
    clearOrder
 } = actions;

export default reducer;
